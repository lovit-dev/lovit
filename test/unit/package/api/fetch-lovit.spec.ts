import configureLovit from '@package/api/configure-lovit';
import fetchLovit from '@package/api/fetch-lovit';
import LovitError from '@package/api/lovit-error';
import type { StatusPathOptions } from '@package/definitions/api/fetch-lovit';
import Message from '@package/utils/message';
import * as validateFetchConfigModule from '@package/validation/validate-fetch-config';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Mock } from '../../../helpers/mock';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('fetchLovit', () => {
  const configName = 'fetch config';

  it('should call validateFetchConfig with correct arguments', async () => {
    const validationError = 'Only to avoid execute fetchLovit';
    const mockConfig = Mock.fetchConfig();

    const validateSpy = vi.spyOn(validateFetchConfigModule, 'default').mockImplementation(() => {
      throw new LovitError(validationError);
    });

    await expect(fetchLovit(mockConfig)).rejects.toThrow(validationError);
    expect(validateSpy).toHaveBeenCalledWith(configName, mockConfig);
  });

  it('should make a request to the url and return the response', async () => {
    const url = 'https://lovit.dev';
    const mockResponse = Mock.fetchResponse();
    const mockConfig = Mock.fetchConfig(['url', url]);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    const response = await fetchLovit(mockConfig);

    expect(fetch).toHaveBeenCalledWith(url, expect.anything());
    expect(response).toStrictEqual(mockResponse);
  });

  it('should make a request using requestFn and return the response', async () => {
    const mockResponse = Mock.fetchResponse();
    const mockConfig = Mock.fetchConfig();

    const response = await fetchLovit(mockConfig);

    expect(response).toStrictEqual(mockResponse);
  });

  it('should extract the status when statusPath is provided', async () => {
    const statusPath = 'status.code';
    const mockResponse = Mock.fetchResponse(['status', { code: 200 }]);
    const mockRequestFn = vi.fn().mockResolvedValue(mockResponse);
    const mockConfig = Mock.fetchConfig(['requestFn', mockRequestFn], ['statusPath', statusPath]);

    const response = await fetchLovit(mockConfig);

    expect(response).toStrictEqual(mockResponse);
  });

  it('should extract the status when statusPath.path is provided', async () => {
    const statusPath: StatusPathOptions = { path: 'status.code' };
    const mockResponse = Mock.fetchResponse(['status', { code: 200 }]);
    const mockRequestFn = vi.fn().mockResolvedValue(mockResponse);
    const mockConfig = Mock.fetchConfig(['requestFn', mockRequestFn], ['statusPath', statusPath]);

    const response = await fetchLovit(mockConfig);

    expect(response).toStrictEqual(mockResponse);
  });

  it('should throw if the extracted status is invalid', async () => {
    const mockResponse = Mock.fetchResponse(['status', { code: 200 }]);
    const mockRequestFn = vi.fn().mockResolvedValue(mockResponse);

    const mockConfig = Mock.fetchConfig(['requestFn', mockRequestFn]);

    await expect(fetchLovit(mockConfig)).rejects.toThrow();
  });

  it('should throw if response is not extractable', async () => {
    const nonExtractableResponse = 'String response';
    const mockRequestFn = vi.fn().mockResolvedValue(nonExtractableResponse);
    const mockConfig = Mock.fetchConfig(['requestFn', mockRequestFn]);

    const errorMessage = Message.invalidType(
      `response from "${mockConfig.key}": "${nonExtractableResponse}". Status could not be determined`,
      'Valid response object'
    );

    await expect(fetchLovit(mockConfig)).rejects.toThrow(errorMessage);
  });

  it('should not extract the status when noStatus is set to true', async () => {
    const nonExtractableResponse = 'String response';
    const mockRequestFn = vi.fn().mockResolvedValue(nonExtractableResponse);
    const mockConfig = Mock.fetchConfig(['requestFn', mockRequestFn], ['noStatus', true]);

    await expect(fetchLovit(mockConfig)).resolves.not.toThrow();
  });

  it('should call the corresponding status error handler', async () => {
    const mockResponse = Mock.fetchResponse(['status', 404]);
    const mockRequestFn = vi.fn().mockResolvedValue(mockResponse);
    const mockNotFoundHandler = vi.fn();
    const mockLovitConfig = Mock.lovitConfig(['modules.post.profile.tasks.getPosts.notFound', mockNotFoundHandler]);
    const mockData = { name: 'Lovit' };
    const mockFetchConfig = Mock.fetchConfig(['requestFn', mockRequestFn], ['data', mockData]);
    const stopFnExecutionSignal = 'Internal Signal';

    const mockContext = {
      response: mockResponse,
      data: mockData,
      statusText: 'Not Found',
      statusCode: 404,
      module: 'post',
      task: 'getPosts',
      handler: 'notFound'
    };

    configureLovit(mockLovitConfig);

    await expect(fetchLovit(mockFetchConfig)).rejects.toThrow(stopFnExecutionSignal);
    expect(mockNotFoundHandler).toHaveBeenCalledWith(mockContext);
  });

  it('should extract the status from the error when statusPath.inCatchBlock is set to true', async () => {
    const errorName = 'Test Error';
    const mockResponse = Mock.fetchResponse(['status', 404], ['name', errorName]);
    const mockRequestFn = vi.fn().mockRejectedValue(mockResponse);
    const mockNotFoundHandler = vi.fn();
    const mockLovitConfig = Mock.lovitConfig(['modules.post.profile.tasks.getPosts.notFound', mockNotFoundHandler]);
    const mockStatusPath = { inCatchBlock: true, errorName };
    const mockFetchConfig = Mock.fetchConfig(['requestFn', mockRequestFn], ['statusPath', mockStatusPath]);
    const stopFnExecutionSignal = 'Internal Signal';

    configureLovit(mockLovitConfig);

    await expect(fetchLovit(mockFetchConfig)).rejects.toThrow(stopFnExecutionSignal);
    expect(mockNotFoundHandler).toHaveBeenCalled();
  });
});

import configureLovit from '@package/api/configure-lovit';
import LovitError from '@package/api/lovit-error';
import { systemContext } from '@package/constants';
import Message from '@package/utils/message';
import * as validateLovitConfigModule from '@package/validation/validate-lovit-config';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { capitalizeFirstLetter } from '../../../../utils/capitalize-first-letter';
import { delay } from '../../../../utils/delay';
import { Mock, type MockOverrides } from '../../../helpers/mock';
import { clearSystemContext } from '../../../helpers/system-context';

afterEach(() => {
  clearSystemContext();
  vi.restoreAllMocks();
});

describe('configureLovit', () => {
  const configName = 'Lovit config';
  const basePath = 'modules.post';

  it('should call validateLovitConfig with correct arguments', () => {
    const validationError = 'Only to avoid execute configureLovit';
    const mockConfig = Mock.lovitConfig();

    const validateSpy = vi.spyOn(validateLovitConfigModule, 'default').mockImplementation(() => {
      throw new LovitError(validationError);
    });

    expect(() => configureLovit(mockConfig)).toThrow(validationError);
    expect(validateSpy).toHaveBeenCalledWith(configName, mockConfig);
  });

  it('should correctly configure the system context', () => {
    const mockNotFoundHandler = vi.fn();
    const mockConfig = Mock.lovitConfig([`${basePath}.profile.tasks.getPosts.notFound`, mockNotFoundHandler]);
    const expectedGlobal = mockConfig.global;

    configureLovit(mockConfig);

    expect(systemContext.global).toStrictEqual(expectedGlobal);
    expect(systemContext.modules.post.tasks.getPosts.notFound?.fn).toStrictEqual(mockNotFoundHandler);
  });

  it('should return the promise that the async entry function returns', async () => {
    const expectedResponse = 'List of blog posts';
    const mockGetPosts = vi.fn().mockResolvedValue(expectedResponse);
    const mockConfig = Mock.lovitConfig([`${basePath}.entryFunctions.getPosts`, mockGetPosts]);

    const lovit = configureLovit(mockConfig);
    const response = await lovit.getPosts();

    expect(response).toBe(expectedResponse);
  });

  it('should return the value that the sync entry function returns', () => {
    const expectedArg = 'Post deleted';
    const mockDeletePost = (arg: string) => arg === expectedArg;
    const mockConfig = Mock.lovitConfig([`${basePath}.entryFunctions.deletePost`, mockDeletePost]);

    const lovit = configureLovit(mockConfig);
    const returnValue = lovit.deletePost(expectedArg);

    expect(returnValue).toBe(true);
  });

  it('should call async catch handler before finally handler when entry function rejects', async () => {
    const callOrder: string[] = [];
    const asyncError = new LovitError('Async fail');
    const expectedCallOrder = ['catch-async', 'finally-async'];

    const mockCatchHandler = vi.fn(async () => {
      await delay(2);
      callOrder.push('catch-async');
    });

    const mockFinallyHandler = vi.fn(async () => {
      await delay(1);
      callOrder.push('finally-async');
    });

    const mockGetPosts = vi.fn().mockRejectedValue(asyncError);

    const overrides: MockOverrides = [
      [`${basePath}.profile.tasks.getPosts`, { catch: mockCatchHandler, finally: mockFinallyHandler }],
      [`${basePath}.entryFunctions.getPosts`, mockGetPosts]
    ];

    const mockConfig = Mock.lovitConfig(...overrides);

    const lovit = configureLovit(mockConfig);
    const result = await lovit.getPosts();

    expect(result).toBeNull();
    expect(mockCatchHandler).toBeCalledWith(asyncError);
    expect(callOrder).toStrictEqual(expectedCallOrder);
  });

  it('should call sync catch handler before finally handler when entry function throws', () => {
    const callOrder: string[] = [];
    const expectedCallOrder = ['catch-sync', 'finally-sync'];
    const syncError = new LovitError('Sync fail');

    const mockDeletePost = vi.fn(() => {
      throw syncError;
    });

    const mockCatchHandler = vi.fn(() => callOrder.push('catch-sync'));
    const mockFinallyHandler = vi.fn(() => callOrder.push('finally-sync'));

    const overrides: MockOverrides = [
      [`${basePath}.profile.tasks.deletePost`, { catch: mockCatchHandler, finally: mockFinallyHandler }],
      [`${basePath}.entryFunctions`, { deletePost: mockDeletePost }]
    ];

    const mockConfig = Mock.lovitConfig(...overrides);

    const lovit = configureLovit(mockConfig);
    const result = lovit.deletePost();

    expect(result).toBeNull();
    expect(mockCatchHandler).toBeCalledWith(syncError);
    expect(callOrder).toStrictEqual(expectedCallOrder);
  });

  it.each(['catch', 'finally'])(
    'should throw if entry function is synchronous and %s handler is async',
    (handlerName) => {
      const errorMessage = Message.invalidUsage(
        `${capitalizeFirstLetter(handlerName)} handler cannot be async when the entry function is synchronous`
      );

      const mockAsyncHandler = vi.fn(async () => {
        await delay(5);
      });

      const mockSyncEntryFn = vi.fn(() => {
        throw new LovitError(errorMessage);
      });

      const mockConfig = Mock.lovitConfig(
        [`${basePath}.profile.tasks.getPosts.${handlerName}`, mockAsyncHandler],
        [`${basePath}.entryFunctions.getPosts`, mockSyncEntryFn]
      );

      const lovit = configureLovit(mockConfig);

      expect(() => {
        lovit.getPosts();
      }).toThrow(errorMessage);
    }
  );
});

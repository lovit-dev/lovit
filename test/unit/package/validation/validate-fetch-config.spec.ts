import Message from '@package/utils/message';
import Type, { type LovitType } from '@package/utils/type';
import validateFetchConfig from '@package/validation/validate-fetch-config';
import { describe, expect, it } from 'vitest';
import { Mock } from '../../../helpers/mock';

describe('validateFetchConfig', () => {
  const configName = 'fetch config';

  it.each([
    ['key', 'string'],
    ['url', 'string'],
    ['requestFn', 'function'],
    ['data', 'object'],
    ['noStatus', 'boolean'],
    ['statusPath', 'string|object'],
    ['statusPath.path', 'string'],
    ['statusPath.inCatchBlock', 'boolean']
  ])('should throw if the %s property is invalid', (path, expectedType) => {
    const message = Message.invalidType(`"${path}" in the ${configName}`, Type.format(expectedType as LovitType));
    const config = Mock.fetchConfig([path, 42]);

    expect(() => {
      validateFetchConfig(configName, config);
    }).toThrow(message);
  });

  it('should throw if the key property is missing', () => {
    const path = 'key';
    const message = Message.missing(`path: "${path}" in the ${configName}`);

    expect(() => {
      validateFetchConfig(configName, Mock.fetchConfig([path, 'DELETE']));
    }).toThrow(message);
  });

  it('should throw if both url and requestFn are missing', () => {
    const paths = ['url', 'requestFn'];
    const message = Message.missing(`path: "${paths.join('", "')}" in the ${configName}. Provide one of these`);

    expect(() => {
      validateFetchConfig(configName, Mock.fetchConfig(['url', 'DELETE'], ['requestFn', 'DELETE']));
    }).toThrow(message);
  });

  it('should throw if statusPath.inCatchBlock is true but statusPath.errorName is not defined', () => {
    const message = Message.missing(`path: "statusPath.errorName" in the ${configName}`);

    expect(() => {
      validateFetchConfig(configName, Mock.fetchConfig(['statusPath.inCatchBlock', true]));
    }).toThrow(message);
  });
});

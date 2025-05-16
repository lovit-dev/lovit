import Message from '@package/utils/message';
import Type, { type LovitType } from '@package/utils/type';
import validateLovitConfig from '@package/validation/validate-lovit-config';
import { describe, expect, it } from 'vitest';
import { Mock } from '../../../helpers/mock';

describe('validateLovitConfig', () => {
  const configName = 'Lovit config';
  const basePath = 'modules.post';

  it.each([
    ['modules', 'object'],
    ['global', 'object'],
    ['global.errorCodeMap', 'object'],
    ['global.errorCodeMapper', 'function'],
    ['global.handlers', 'object'],
    ['global.handlers.notFound', 'function'],
    [`${basePath}.profile`, 'object'],
    [`${basePath}.profile.tasks`, 'object'],
    [`${basePath}.profile.tasks.getPosts`, 'object'],
    [`${basePath}.profile.tasks.getPosts.notFound`, 'function'],
    [`${basePath}.profile.sharedHandlers`, 'object'],
    [`${basePath}.profile.sharedHandlers.notFound`, 'function'],
    [`${basePath}.entryFunctions`, 'object'],
    [`${basePath}.entryFunctions.getPosts`, 'function']
  ])('should throw if the %s path is invalid', (path, expectedType) => {
    const message = Message.invalidType(`"${path}" in the ${configName}`, Type.format(expectedType as LovitType));
    const config = Mock.lovitConfig([path, 42]);

    expect(() => {
      validateLovitConfig(configName, config);
    }).toThrow(message);
  });

  it.each([`${basePath}.profile.tasks`, `${basePath}.entryFunctions`, `${basePath}.profile.sharedHandlers`])(
    'should throw if the %s path is missing',
    (path) => {
      const message = Message.missing(`path: "${path}" in the ${configName}`);
      const config = Mock.lovitConfig([path, 'DELETE']);

      expect(() => {
        validateLovitConfig(configName, config);
      }).toThrow(message);
    }
  );
});

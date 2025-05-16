// --------------------------------------------------------------------------
// Lovit validation/validate-fetch-config.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { FetchConfig } from '../definitions/api/fetch-lovit';
import Type from '../utils/type';
import Validator from '../utils/validator';

//
// Public
//

const validateFetchConfig = (configName: string, config: FetchConfig) => {
  const validator = new Validator(configName, config);

  validator.require('key', 'string');
  validator.maybeTypeOf('url', 'string');
  validator.maybeTypeOf('requestFn', 'function');
  validator.requireOneOf(['url', 'requestFn']);
  validator.maybeTypeOf('data', 'object');
  validator.maybeTypeOf('noStatus', 'boolean');
  validator.maybeTypeOf('statusPath', 'string|object');

  if (Type.of(config.statusPath, 'object')) {
    validator.maybeTypeOf('statusPath.path', 'string');
    validator.maybeTypeOf('statusPath.inCatchBlock', 'boolean');

    if (config.statusPath.inCatchBlock === true) {
      validator.require('statusPath.errorName', 'string');
    }
  }
};

export default validateFetchConfig;

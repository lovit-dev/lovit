// --------------------------------------------------------------------------
// Lovit validation/validate-lovit-config.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { Modules } from '../api/configure-lovit';
import type { LovitConfig } from '../definitions/api/configure-lovit';
import Validator from '../utils/validator';

//
// Public
//

const validateLovitConfig = (configName: string, config: LovitConfig) => {
  const validator = new Validator(configName, config);

  validator.maybeTypeOf('modules', 'object');

  if (validator.maybeTypeOf('global', 'object')) {
    if (validator.maybeTypeOf('global.handlers', 'object')) {
      for (const globalHandlerName of Object.keys(config.global?.handlers || {})) {
        validator.require(`global.handlers.${globalHandlerName}`, 'function');
      }
    }

    validator.maybeTypeOf('global.errorCodeMap', 'object');
    validator.maybeTypeOf('global.errorCodeMapper', 'function');
  }

  for (const [moduleName, moduleConfig] of Object.entries(config.modules as Modules)) {
    const profilePath = `modules.${moduleName}.profile`;

    if (validator.maybeTypeOf(profilePath, 'object')) {
      validator.require(`${profilePath}.tasks`, 'object');
      validator.require(`${profilePath}.sharedHandlers`, 'object');

      // TODO: TypeScript should recognize that `validator.maybeTypeOf` has already validated the types,
      // allowing us to safely remove the null check for `sharedHandlers` below, as well as the type assertion
      // "config.modules as Modules" above.
      if (!moduleConfig.profile?.sharedHandlers) {
        return;
      }

      for (const sharedHandlerName of Object.keys(moduleConfig.profile.sharedHandlers)) {
        validator.require(`${profilePath}.sharedHandlers.${sharedHandlerName}`, 'function');
      }

      for (const [taskName, handlers] of Object.entries(moduleConfig.profile.tasks)) {
        validator.require(`${profilePath}.tasks.${taskName}`, 'object');

        for (const handlerName of Object.keys(handlers)) {
          validator.require(`${profilePath}.tasks.${taskName}.${handlerName}`, 'function');
        }
      }
    }

    validator.require(`modules.${moduleName}.entryFunctions`, 'object');

    for (const entryFunctionName of Object.keys(moduleConfig.entryFunctions)) {
      validator.require(`modules.${moduleName}.entryFunctions.${entryFunctionName}`, 'function');
    }
  }
};

export default validateLovitConfig;

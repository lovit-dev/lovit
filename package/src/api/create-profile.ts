// --------------------------------------------------------------------------
// Lovit api/create-profile.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { ProfileConfig } from '../definitions/api/create-profile';

//
// Types
//

type ConfiguredProfile<T extends ProfileConfig> = {
  tasks: undefined extends T['tasks'] ? Record<string, any> : T['tasks'];
  sharedHandlers: undefined extends T['sharedHandlers'] ? Record<string, any> : T['sharedHandlers'];
};

/**
 * Configures profile for a module.
 *
 * @param profileConfig - The profile configuration object.
 * @returns An configured profile object, which is used when configuring Lovit.
 */

const createProfile = <T extends ProfileConfig>(profileConfig: T): ConfiguredProfile<T> => {
  const { tasks = {}, sharedHandlers = {} } = profileConfig;
  return { tasks, sharedHandlers };
};

export default createProfile;

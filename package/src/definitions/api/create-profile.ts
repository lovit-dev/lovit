// --------------------------------------------------------------------------
// Lovit definitions/create-profile.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { Handlers } from '../../utils/handler';

export interface ProfileConfig {
  /**
   * The name of the profile (e.g., "user", "menu").
   */
  name: string;

  /**
   * An object where each key corresponds to a task (e.g., `login`, `signup`),
   * and the value is the corresponding handler functions.
   */
  tasks?: Record<string, Handlers>;

  /**
   * An object containing shared handlers that apply to all tasks in a module.
   */
  sharedHandlers?: Handlers;
}

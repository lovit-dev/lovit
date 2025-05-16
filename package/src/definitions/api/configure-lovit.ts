// --------------------------------------------------------------------------
// Lovit definitions/configure-lovit.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { EntryFunctions, Modules } from '../../api/configure-lovit';
import { StatusCode } from '../../api/fetch-lovit';
import type { Handlers } from '../../utils/handler';

export interface Profile {
  /**
   * An object where each key corresponds to a task (e.g., `login`, `signup`),
   * and the value is the corresponding handler functions.
   */
  tasks: Record<string, Handlers>;

  /**
   * An object containing shared handlers that apply to all tasks in a module.
   */
  sharedHandlers: Handlers;
}

export interface ModuleConfig {
  /**
   * An object defining tasks and shared handlers.
   */
  profile?: Profile;

  /**
   * An object where each key matches a task name,
   * and the value is the corresponding entry function.
   */
  entryFunctions: EntryFunctions;
}

export interface GlobalConfig {
  /**
   * An object where each key is a custom error status (e.g., `auth/invalid-email`)
   * and the value is the corresponding HTTP error status code.
   */
  errorCodeMap?: Record<string, StatusCode>;

  /**
   * A function that returns the corresponding HTTP error status code for a custom error status (e.g., `auth/invalid-email`).
   */
  errorCodeMapper?: (status: string) => StatusCode | undefined;

  /**
   * Global handlers shared across all modules.
   */
  handlers?: Handlers;
}

export interface LovitConfig {
  /**
   * An object where each key corresponds to a module (e.g., `user`, `menu`),
   * and the value is the module configuration, see {@link ModuleConfig}.
   */
  modules?: Modules;

  /**
   * Global configuration shared across all modules, see {@link GlobalConfig}.
   */
  global?: GlobalConfig;
}

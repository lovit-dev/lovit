// --------------------------------------------------------------------------
// Lovit definitions/fetch-lovit.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { Key, RequestFunction } from '../../api/fetch-lovit';

export interface StatusPathOptions {
  /**
   * The path to extract the status from the response.
   * @defaultValue `status`
   */
  path?: string;

  /**
   * Indicates whether the status path should be extracted from the
   * error in the `catch` block.
   * @defaultValue `false`
   */
  inCatchBlock?: boolean;

  /**
   * The name of the error (e.g., "FirebaseError") that contains the status.
   * Required if `inCatchBlock` is set to `true`.
   */
  errorName?: string;
}

export interface FetchConfig {
  /**
   * A unique key identifying the request.
   * The format is `moduleName.taskName` (e.g., `user.login`).
   */
  key: Key;

  /**
   * The URL for the request. An alternative to using `requestFn`.
   */
  url?: string;

  /**
   * The request function to be used for making the request.
   * An alternative to `url`.
   */
  requestFn?: RequestFunction;

  /**
   * Indicates that no status should be extracted or checked from the response.
   * @defaultValue `false`
   */
  noStatus?: boolean;

  /**
   * Additional options for the fetch request, such as headers or method.
   */
  options?: RequestInit;

  /**
   * Defines where to extract the status from the response.
   * Can be either a string path or an object of options ({@link StatusPathOptions}).
   * @defaultValue `status`
   */
  statusPath?: string | StatusPathOptions;

  /**
   * Custom data that can be accessed in any handler.
   */
  data?: Record<string, any>;
}

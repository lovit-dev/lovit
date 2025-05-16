// --------------------------------------------------------------------------
// Lovit definitions/utils/handler.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { StatusHandlerName } from '../../utils/handler';

/**
 * Supported handler function name.
 */
export type HandlerName = StatusHandlerName | 'catch' | 'finally' | 'failed';

export interface Context {
  /**
   * Custom data that can be accessed in any handler.
   */
  data: Record<string, any>;

  /**
   * The non-OK (failure) response or the error thrown by the service, returned from the `requestFn` or `url`.
   */
  response: any;

  /**
   * The HTTP status text (e.g., "Not Found", "OK").
   */
  statusText: string;

  /**
   * The HTTP status code (e.g., 404, 500).
   */
  statusCode: number | 'unknown';

  /**
   * The module name.
   */
  module: string;

  /**
   * The task name.
   */
  task: string;

  /**
   * The handler name.
   */
  handler: StatusHandlerName;
}

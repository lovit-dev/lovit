// --------------------------------------------------------------------------
// Lovit definitions/throw-error.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

export interface ThrowErrorOptions {
  /**
   * The error message to be used when throwing the error.
   */
  message: string;

  /**
   * Additional custom properties that can be accessed on the
   * thrown error object.
   */
  [key: string | symbol]: any;
}

// --------------------------------------------------------------------------
// Lovit api/lovit-error.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { Meta } from '../definitions/api/lovit-error';

//
// Constants
//

const NAME = 'Lovit';

/**
 * Custom error (LovitError) based on the built-in Error constructor.
 *
 * @extends Error
 */
class LovitError extends Error {
  [key: string | symbol]: any;

  /**
   * Creates a new LovitError based on the built-in Error constructor.
   *
   * @param message The error message to be set for the error.
   * @param meta - Optional object containing additional custom properties for the error.
   */
  constructor(message: string, meta: Meta = {}) {
    super(message);

    this.name = `${NAME} ${meta.messageType || 'Error'}`;

    Object.assign(this, meta);

    if ('captureStackTrace' in Error) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}

export default LovitError;

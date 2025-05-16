// --------------------------------------------------------------------------
// Lovit api/throw-error.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import type { ThrowErrorOptions } from '../definitions/api/throw-error';
import { type MessageType } from '../utils/message';
import Type from '../utils/type';
import validateThrowErrorInput from '../validation/validate-throw-error-input';
import LovitError from './lovit-error';

//
// Constants
//

const DEFAULT_MESSAGE_TYPE: MessageType = 'Error';

/**
 * Throws a LovitError based on the provided error input.
 *
 * @param input The error message (string) or an options object, see {@link ThrowErrorOptions}.
 * @param messageType Optional type of message, such as `Error` or `Warning`. Defaults to `Error`. See {@link MessageType}.
 * @throws A custom error (LovitError).
 */
const throwError = (input: string | ThrowErrorOptions, messageType: MessageType = DEFAULT_MESSAGE_TYPE): never => {
  validateThrowErrorInput(input);

  if (Type.of(input, 'string')) {
    throw new LovitError(input, { messageType });
  }

  throw new LovitError(input.message, { ...input, messageType });
};

export default throwError;

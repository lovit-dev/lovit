// --------------------------------------------------------------------------
// Lovit validation/validate-throw-error-input.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import LovitError from '../api/lovit-error';
import type { ThrowErrorOptions } from '../definitions/api/throw-error';
import Message from '../utils/message';
import Type from '../utils/type';

//
// Public
//

const validateThrowErrorInput = (input: string | ThrowErrorOptions) => {
  if (!Type.of(input, 'string') && !Type.of(input, 'object')) {
    throw new LovitError(Message.invalidType('throwError argument', ' string or a valid options object'));
  }
};

export default validateThrowErrorInput;

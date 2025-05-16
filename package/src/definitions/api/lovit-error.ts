// --------------------------------------------------------------------------
// Lovit definitions/lovit-error.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { MessageType } from '../../utils/message';

export interface Meta {
  /**
   * The type of the message that will be prefixed to the thrown error message.
   * @defaultValue "Error"
   */
  messageType?: MessageType;

  /**
   * Additional custom properties that can be accessed on the
   * thrown error object.
   */
  [key: string | symbol]: any;
}

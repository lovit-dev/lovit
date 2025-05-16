// --------------------------------------------------------------------------
// Lovit utils/signal.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

//
// Constants
//

const NAME = 'InternalSignal';
const MESSAGE = 'Internal Signal';

export const Signals = {
  STOP_ENTRY_FN_EXECUTION: Symbol('STOP_ENTRY_FN_EXECUTION')
} as const;

//
// Types
//

type SignalValue = (typeof Signals)[keyof typeof Signals];
type SignalFlags = Record<symbol, boolean>;

//
// Private
//

class InternalSignal extends Error {
  [key: symbol]: boolean; // Could later be designed to send data with signals as well (payload)

  constructor(signalFlags?: SignalFlags) {
    super(MESSAGE);

    this.name = NAME;

    if (signalFlags) {
      Object.assign(this, signalFlags);
    }
  }
}

//
// Public
//

const Signal = {
  entryFunction: {
    /**
     * Stops the execution of the entry function when an
     * error handler is triggered, such as `notFound` for a 404 error.
     *
     * @throws An {@link InternalSignal} with the `STOP_ENTRY_FN_EXECUTION` signal.
     */
    stopExecution() {
      throw new InternalSignal({ [Signals.STOP_ENTRY_FN_EXECUTION]: true });
    }
  },

  /**
   * Checks if the thrown error was caused by a specific internal signal.
   * Used to differentiate library-specific signals from general errors.
   *
   * @param error The error object that was thrown.
   * @param signalValue The specific signal value to check for.
   * @returns A boolean indicating whether the error was caused by the specific signal.
   */
  isSignal(error: unknown, signalValue: SignalValue): boolean {
    return error instanceof InternalSignal && error[signalValue];
  }
};

export default Signal;

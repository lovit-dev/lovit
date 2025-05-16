import LovitError from '@package/api/lovit-error';
import Signal, { Signals } from '@package/utils/signal';
import { describe, expect, it } from 'vitest';

describe('Signal', () => {
  describe('entryFunction.stopExecution', () => {
    it('should throw an InternalSignal with the STOP_ENTRY_FN_EXECUTION signal', () => {
      const expectedSignal = {
        name: 'InternalSignal',
        [Signals.STOP_ENTRY_FN_EXECUTION]: true
      };

      expect(() => Signal.entryFunction.stopExecution()).toThrow(expect.objectContaining(expectedSignal));
    });
  });

  describe('isSignal', () => {
    it('should return true if the error is an InternalSignal', () => {
      try {
        Signal.entryFunction.stopExecution();
      } catch (error) {
        expect(Signal.isSignal(error, Signals.STOP_ENTRY_FN_EXECUTION)).toBe(true);
      }
    });

    it('should return false if the error is not an InternalSignal', () => {
      const error = new LovitError('Lovit Error');

      expect(Signal.isSignal(error, Signals.STOP_ENTRY_FN_EXECUTION)).toBe(false);
    });
  });
});

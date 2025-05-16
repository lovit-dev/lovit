import LovitError from '@package/api/lovit-error';
import { systemContext } from '@package/constants';
import type { Context, HandlerName } from '@package/definitions/utils/handler';
import Handler from '@package/utils/handler';
import Message from '@package/utils/message';
import Signal from '@package/utils/signal';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Mock } from '../../../helpers/mock';
import { clearSystemContext } from '../../../helpers/system-context';

beforeEach(() => {
  clearSystemContext();
});

describe('Handler', () => {
  describe('handleStatusError', () => {
    const key = 'post.getPosts';
    const handlerName: HandlerName = 'notFound';

    it('should call the correct error status handler', async () => {
      const mockNotFoundFn = vi.fn();
      const mockSystemContext = Mock.systemContext(['modules.post.tasks.getPosts.notFound.fn', mockNotFoundFn]);

      const mockContext: Context = {
        data: { name: 'Lovit' },
        response: Mock.fetchResponse(['status', 404]),
        statusText: 'Not Found',
        statusCode: 404,
        module: 'post',
        task: 'getPosts',
        handler: 'notFound'
      };

      systemContext.modules = mockSystemContext.modules;

      await Handler.handleStatusError(handlerName, key, mockContext);

      expect(mockNotFoundFn).toHaveBeenCalledWith(mockContext);
    });

    it('should not call the error status handler if its not defined', async () => {
      const mockSystemContext = Mock.systemContext(['modules.post.tasks.getPosts', {}]);

      systemContext.modules = mockSystemContext.modules;

      await expect(Handler.handleStatusError(handlerName, key, null as any)).resolves.toBeUndefined();
    });
  });

  describe('handleCatchAsync', () => {
    it('should call the catch handler with the error', async () => {
      const error = new LovitError('Test Error');
      const mockCatchHandler = vi.fn();

      await Handler.handleCatchAsync(error, mockCatchHandler);

      expect(mockCatchHandler).toHaveBeenCalledWith(error);
    });

    it('should rethrow the error if no catch handler is defined', async () => {
      const error = new LovitError('Uncaught error');

      await expect(Handler.handleCatchAsync(error)).rejects.toThrow(error);
    });

    it('should not call the catch handler if error is STOP_ENTRY_FN_EXECUTION signal', async () => {
      try {
        Signal.entryFunction.stopExecution();
      } catch (error) {
        const mockCatchHandler = vi.fn();

        await Handler.handleCatchAsync(error, mockCatchHandler);

        expect(mockCatchHandler).not.toHaveBeenCalled();
      }
    });
  });

  describe('handleCatchSync', () => {
    it('should call the catch handler with the error', () => {
      const error = new LovitError('Test Error');
      const mockCatchHandler = vi.fn();

      Handler.handleCatchSync(error, mockCatchHandler);

      expect(mockCatchHandler).toHaveBeenCalledWith(error);
    });

    it('should rethrow the error if no catch handler is defined', () => {
      const error = new LovitError('Uncaught error');

      expect(() => {
        Handler.handleCatchSync(error);
      }).toThrow(error);
    });

    it('should not call the catch handler if error is STOP_ENTRY_FN_EXECUTION signal', () => {
      try {
        Signal.entryFunction.stopExecution();
      } catch (error) {
        const mockCatchHandler = vi.fn();

        Handler.handleCatchSync(error, mockCatchHandler);

        expect(mockCatchHandler).not.toHaveBeenCalled();
      }
    });

    it('should throw if catch handler is async but the entry function is sync', () => {
      const error = new LovitError('Test Error');
      const errorMessage = Message.invalidUsage('Catch handler cannot be async when the entry function is synchronous');
      const mockAsyncCatchHandler = vi.fn().mockResolvedValue(null);

      expect(() => {
        Handler.handleCatchSync(error, mockAsyncCatchHandler);
      }).toThrow(errorMessage);
    });
  });

  describe('handleFinallyAsync', () => {
    it('should call the finally handler if is defined', async () => {
      const mockFinallyHandler = vi.fn();

      await Handler.handleFinallyAsync(mockFinallyHandler);

      expect(mockFinallyHandler).toHaveBeenCalled();
    });

    it('should not throw if finally handler is not provided', async () => {
      await expect(Handler.handleFinallyAsync()).resolves.toBeUndefined();
    });
  });

  describe('handleFinallySync', () => {
    it('should call the finally handler if provided', () => {
      const mockFinallyHandler = vi.fn();

      Handler.handleFinallySync(mockFinallyHandler);

      expect(mockFinallyHandler).toHaveBeenCalled();
    });

    it('should not throw if finally handler is not provided', () => {
      expect(() => {
        Handler.handleFinallySync();
      }).not.toThrow();
    });

    it('should throw if the finally handler is async but the entry function is sync', () => {
      const errorMessage = Message.invalidUsage(
        'Finally handler cannot be async when the entry function is synchronous'
      );
      const mockAsyncFinallyHandler = vi.fn().mockResolvedValue(null);

      expect(() => {
        Handler.handleFinallySync(mockAsyncFinallyHandler);
      }).toThrow(errorMessage);
    });
  });
});

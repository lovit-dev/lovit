// --------------------------------------------------------------------------
// Lovit utils/handler.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { capitalizeFirstLetter } from '../../../utils/capitalize-first-letter';
import type { Key } from '../api/fetch-lovit';
import throwError from '../api/throw-error';
import { systemContext } from '../constants';
import type { Context, HandlerName } from '../definitions/utils/handler';
import Message from './message';
import PathNavigator from './path-navigator';
import Signal, { Signals } from './signal';

//
// Constants
//

const FAILED_HANDLER_NAME = 'failed';

// Learn more about HTTP status codes:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export const STATUS_HANDLERS = {
  400: 'badRequest',
  401: 'unauthorized',
  402: 'paymentRequired',
  403: 'forbidden',
  404: 'notFound',
  405: 'methodNotAllowed',
  406: 'notAcceptable',
  407: 'proxyAuthRequired',
  408: 'requestTimeout',
  409: 'conflict',
  410: 'gone',
  411: 'lengthRequired',
  412: 'preconditionFailed',
  413: 'contentTooLarge',
  414: 'uriTooLong',
  415: 'unsupportedMediaType',
  416: 'rangeNotSatisfiable',
  417: 'expectationFailed',
  418: 'imATeapot',
  421: 'misdirectedRequest',
  422: 'unprocessableContent',
  423: 'locked',
  424: 'failedDependency',
  425: 'tooEarly',
  426: 'upgradeRequired',
  428: 'preconditionRequired',
  429: 'tooManyRequests',
  431: 'requestHeaderFieldsTooLarge',
  451: 'unavailableForLegalReasons',

  500: 'internalServerError',
  501: 'notImplemented',
  502: 'badGateway',
  503: 'serviceUnavailable',
  504: 'gatewayTimeout',
  505: 'httpVersionNotSupported',
  506: 'variantAlsoNegotiates',
  507: 'insufficientStorage',
  508: 'loopDetected',
  510: 'notExtended',
  511: 'networkAuthRequired'
} as const;

//
// Types
//

type VoidOrPromise = void | Promise<void>;

enum HandlerExecutionMode {
  Async = 'async',
  Sync = 'sync'
}

export type StatusHandlers = {
  [status in StatusHandlerName]?: StatusHandler;
};

export type Handlers = StatusHandlers & { catch?: CatchHandler } & { finally?: FinallyHandler } & {
  failed?: FailedHandler;
};

export type FinallyHandler = () => VoidOrPromise;
export type CatchHandler = (error: unknown) => VoidOrPromise;
export type StatusHandler = (context: Context) => VoidOrPromise;
export type FailedHandler = (context: Context) => VoidOrPromise;
export type StatusHandlerName = (typeof STATUS_HANDLERS)[keyof typeof STATUS_HANDLERS] | 'unknown';

//
// Private
//

const getHandler = <T extends HandlerName>(name: T, key: Key) => {
  const [moduleName, taskName] = PathNavigator.parse(key);
  const module = systemContext.modules[moduleName];
  const sharedHandlers = module?.sharedHandlers;
  const taskHandlers = module?.tasks[taskName];
  const globalHandlers = systemContext.global.handlers;

  return (taskHandlers?.[name]?.fn || sharedHandlers[name] || globalHandlers[name]) as Handlers[T];
};

const executeCatchHandler = (error: unknown, mode: HandlerExecutionMode, catchHandler?: CatchHandler) => {
  if (Signal.isSignal(error, Signals.STOP_ENTRY_FN_EXECUTION)) {
    return;
  }

  if (!catchHandler) {
    throw error;
  }

  const result = catchHandler?.(error);

  if (mode === HandlerExecutionMode.Sync) {
    throwIfAsyncHandler(result, 'catch');
  }

  return result;
};

const throwIfAsyncHandler = (result: VoidOrPromise, handlerName: HandlerName) => {
  if (result instanceof Promise) {
    throwError(
      Message.invalidUsage(
        `${capitalizeFirstLetter(handlerName)} handler cannot be async when the entry function is synchronous`
      )
    );
  }
};

//
// Public
//

const Handler = {
  async handleStatusError(name: StatusHandlerName, key: Key, context: Context): Promise<void> {
    const statusHandler = getHandler(name, key);

    await statusHandler?.(context);

    if (!statusHandler) {
      await getHandler(FAILED_HANDLER_NAME, key)?.(context);
    }
  },

  async handleCatchAsync(error: unknown, handler?: CatchHandler): Promise<void> {
    await executeCatchHandler(error, HandlerExecutionMode.Async, handler);
  },

  handleCatchSync(error: unknown, handler?: CatchHandler): void {
    void executeCatchHandler(error, HandlerExecutionMode.Sync, handler);
  },

  async handleFinallyAsync(handler?: FinallyHandler): Promise<void> {
    await handler?.();
  },

  handleFinallySync(handler?: FinallyHandler): void {
    const result = handler?.();
    throwIfAsyncHandler(result, 'finally');
  }
};

export default Handler;

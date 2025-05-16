import type { GlobalConfig } from './definitions/api/configure-lovit';
import type { HandlerName } from './definitions/utils/handler';
import type { CatchHandler, FailedHandler, FinallyHandler, Handlers, StatusHandler } from './utils/handler';

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export interface SystemContextHandlerOptions {
  fn: StatusHandler | CatchHandler | FinallyHandler | FailedHandler;
}

export type SystemContextHandlers = Partial<Record<HandlerName, SystemContextHandlerOptions>>;

export interface SystemContext {
  modules: {
    [moduleName: string]: {
      tasks: Record<string, SystemContextHandlers>;
      sharedHandlers: Handlers;
    };
  };
  global: {
    errorCodeMap: NonNullable<GlobalConfig['errorCodeMap']>;
    errorCodeMapper?: GlobalConfig['errorCodeMapper'];
    handlers: Handlers;
  };
}

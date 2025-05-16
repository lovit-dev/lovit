// --------------------------------------------------------------------------
// Lovit api/configure-lovit.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { systemContext } from '../constants';
import type { GlobalConfig, LovitConfig, ModuleConfig, Profile } from '../definitions/api/configure-lovit';
import type { HandlerName } from '../definitions/utils/handler';
import type { UnionToIntersection } from '../typing';
import Handler, { type CatchHandler, type FinallyHandler } from '../utils/handler';
import validateLovitConfig from '../validation/validate-lovit-config';

//
// Constants
//

const CONFIG_NAME = 'Lovit config';

//
// Types
//

type BaseFunction = (...args: any[]) => any;
type WrappedEntryFunctions = Record<string, BaseFunction>;

type ConfiguredLovit<T extends LovitConfig> = T['modules'] extends Modules
  ? UnionToIntersection<T['modules'][keyof T['modules']]['entryFunctions']>
  : object;

export type Modules = Record<string, ModuleConfig>;
export type EntryFunction = BaseFunction;
export type EntryFunctions = Record<string, EntryFunction>;

//
// Class definition
//

class LovitConfigurator {
  private readonly wrappedEntryFunctions: WrappedEntryFunctions = {};

  constructor(
    private modules: Modules,
    private global: GlobalConfig
  ) {
    systemContext.global = {
      handlers: global.handlers || {},
      errorCodeMap: global.errorCodeMap || {},
      errorCodeMapper: global.errorCodeMapper
    };
  }

  // Public
  configureLovit(): WrappedEntryFunctions {
    this.configureSystemContext();
    return this.wrappedEntryFunctions;
  }

  // Private
  private configureSystemContext() {
    for (const [moduleName, { profile, entryFunctions }] of Object.entries(this.modules)) {
      const moduleTasks = (systemContext.modules[moduleName] ??= {
        tasks: {},
        sharedHandlers: profile?.sharedHandlers || {}
      }).tasks;

      for (const [taskName, handlers] of Object.entries(profile?.tasks || {})) {
        const taskHandlers = (moduleTasks[taskName] ??= {});

        for (const [name, fn] of Object.entries(handlers)) {
          taskHandlers[name as HandlerName] = { fn };
        }
      }

      this.wrapEntryFunctions(entryFunctions, profile);
    }
  }

  private wrapEntryFunctions(entryFunctions: EntryFunctions, profile?: Profile) {
    for (const [entryFunctionName, entryFunction] of Object.entries(entryFunctions)) {
      const { catch: catchHandler, finally: finallyHandler } =
        profile?.tasks[entryFunctionName] || profile?.sharedHandlers || this.global.handlers || {};

      this.wrappedEntryFunctions[entryFunctionName] = this.createWrappedEntryFunction(
        entryFunction,
        catchHandler,
        finallyHandler
      );
    }
  }

  private createWrappedEntryFunction(
    entryFunction: EntryFunction,
    catchHandler?: CatchHandler,
    finallyHandler?: FinallyHandler
  ) {
    return (...args: any[]) => {
      let isAsync = false;

      try {
        const result = entryFunction(...args);

        if (result instanceof Promise) {
          isAsync = true;
          return this.handleAsyncResult(result, catchHandler, finallyHandler);
        }

        return result as unknown;
      } catch (error) {
        if (!isAsync) {
          Handler.handleCatchSync(error, catchHandler);
        }

        return null;
      } finally {
        if (!isAsync) {
          Handler.handleFinallySync(finallyHandler);
        }
      }
    };
  }

  private async handleAsyncResult(result: unknown, catchHandler?: CatchHandler, finallyHandler?: FinallyHandler) {
    try {
      return await result;
    } catch (error) {
      await Handler.handleCatchAsync(error, catchHandler);
      return null;
    } finally {
      await Handler.handleFinallyAsync(finallyHandler);
    }
  }
}

/**
 * Configures Lovit based on the provided configuration object.
 *
 * @param lovitConfig - The configuration object for Lovit, see {@link LovitConfig}.
 * @returns The wrapped entry functions that have been configured.
 */
const configureLovit = <T extends LovitConfig>(lovitConfig: T): ConfiguredLovit<T> => {
  validateLovitConfig(CONFIG_NAME, lovitConfig);

  const { modules = {}, global = {} } = lovitConfig;

  return new LovitConfigurator(modules, global).configureLovit() as ConfiguredLovit<T>;
};

export default configureLovit;

// --------------------------------------------------------------------------
// Lovit api/fetch-lovit.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { toStatusText } from '../../../utils/to-status-text';
import { isErrorStatus } from '../../../utils/validation/is-error-status';
import { systemContext } from '../constants';
import type { FetchConfig, StatusPathOptions } from '../definitions/api/fetch-lovit';
import Handler, { STATUS_HANDLERS } from '../utils/handler';
import Message from '../utils/message';
import PathNavigator from '../utils/path-navigator';
import Signal from '../utils/signal';
import Type from '../utils/type';
import validateFetchConfig from '../validation/validate-fetch-config';
import throwError from './throw-error';

//
// Constants
//

const DEFAULT_STATUS = 200;
const CONFIG_NAME = 'fetch config';
const UNKNOWN_VALUE = 'unknown';

const DEFAULT_STATUS_PATH = {
  path: 'status',
  inCatchBlock: false,
  errorName: 'Error'
} satisfies StatusPathOptions;

//
// Types
//

export type Key = `${string}.${string}`;
export type RequestFunction = (...args: any[]) => any;
export type StatusCode = keyof typeof STATUS_HANDLERS;

//
// Class definition
//

class LovitFetcher<TResponse> {
  private key: Key;
  private url!: string;
  private requestFn!: RequestFunction;
  private options: RequestInit;
  private data: Record<string, any>;
  private noStatus: boolean;
  private statusPath: Required<StatusPathOptions>;

  private responseRequestFn!: TResponse | Record<string, any>;
  private responseUrl!: Response;
  private status: StatusCode | typeof DEFAULT_STATUS = DEFAULT_STATUS;

  constructor({
    key,
    url,
    requestFn,
    options = {},
    data = {},
    noStatus = false,
    statusPath = DEFAULT_STATUS_PATH
  }: FetchConfig) {
    this.key = key;
    this.options = options;
    this.data = data;
    this.noStatus = noStatus;

    if (url) {
      this.url = url;
    }

    if (requestFn) {
      this.requestFn = requestFn;
    }

    this.statusPath = Type.of(statusPath, 'object')
      ? { ...DEFAULT_STATUS_PATH, ...statusPath }
      : { ...DEFAULT_STATUS_PATH, path: statusPath };
  }

  // Public
  async fetchLovit(): Promise<TResponse> {
    await this.executeRequest();

    if (isErrorStatus(this.status)) {
      await this.handleErrorStatus();
      Signal.entryFunction.stopExecution();
    }

    return this.getResponse();
  }

  // Private
  private async executeRequest() {
    await (this.url ? this.fetchFromUrl() : this.fetchFromRequestFn());
  }

  private async fetchFromUrl() {
    this.responseUrl = await fetch(this.url, this.options);
    this.setStatus(this.responseUrl);
  }

  private async fetchFromRequestFn() {
    try {
      this.responseRequestFn = await this.requestFn();

      if (!this.statusPath.inCatchBlock) {
        this.setStatus(this.responseRequestFn);
      }
    } catch (error) {
      if (Type.of(error, 'object') && this.statusPath.inCatchBlock && error.name === this.statusPath.errorName) {
        this.responseRequestFn = error;
        this.setStatus(error);
      } else {
        throw error;
      }
    }
  }

  private async handleErrorStatus() {
    const handlerName = this.getHandlerName();
    const [moduleName = UNKNOWN_VALUE, taskName = UNKNOWN_VALUE] = this.key.split('.');

    const statusCode =
      Object.keys(STATUS_HANDLERS)
        .map(Number)
        .find((key) => STATUS_HANDLERS[key as StatusCode] === handlerName) || UNKNOWN_VALUE;

    await Handler.handleStatusError(handlerName, this.key, {
      response: this.getResponse(),
      data: this.data,
      statusText: toStatusText(handlerName),
      statusCode,
      module: moduleName,
      task: taskName,
      handler: handlerName
    });
  }

  private getResponse() {
    return (this.url ? this.responseUrl : this.responseRequestFn) as TResponse;
  }

  private getHandlerName() {
    return STATUS_HANDLERS[this.status as StatusCode] || UNKNOWN_VALUE;
  }

  private getMapStatusCode(status: string) {
    const { global } = systemContext;
    const statusCode = global.errorCodeMap[status] || global.errorCodeMapper?.(status);

    if (!statusCode) {
      throwError(
        `The status "${status}" extracted from "${this.key}" response wasn't found in either errorCodeMap or errorCodeMapper.`
      );
    }

    return statusCode;
  }

  private setStatus(source: any) {
    if (this.shouldSkipStatusCheck(source)) {
      return;
    }

    const status = PathNavigator.get(source, this.statusPath.path);

    if (!status || !Type.of(status, 'string|number')) {
      console.error(
        Message.invalidType(
          `status: ${JSON.stringify(status)}. From "${this.key}" response at status path "${this.statusPath.path}"`,
          'valid string or number status'
        )
      );

      throw source;
    }

    this.status = Type.of(status, 'string') ? this.getMapStatusCode(status) : (status as StatusCode);
  }

  private shouldSkipStatusCheck(source: any) {
    return this.noStatus || (!Type.of(source, 'object') && this.throwInvalidResponse(source));
  }

  private throwInvalidResponse(source: any): never {
    return throwError(
      Message.invalidType(
        `response from "${this.key}": ${JSON.stringify(source)}. Status could not be determined`,
        'Valid response object'
      )
    );
  }
}

/**
 * Makes a request to a URL or executes a request function.
 *
 * @template TResponse The expected response type. Defaults to [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).
 * @param fetchConfig  The request configuration object, see {@link FetchConfig}.
 * @returns The response from the request
 */
async function fetchLovit<TResponse = Response>(fetchConfig: FetchConfig): Promise<TResponse> {
  validateFetchConfig(CONFIG_NAME, fetchConfig);
  return new LovitFetcher<TResponse>(fetchConfig).fetchLovit();
}

export default fetchLovit;

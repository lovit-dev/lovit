import type { HandlerName } from '../package/src/definitions/utils/handler';

export const toStatusText = (handlerName: HandlerName) =>
  handlerName.replaceAll(/[A-Z]/g, (c) => ' ' + c).replace(/^./, (c) => c.toUpperCase());

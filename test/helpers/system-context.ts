import { systemContext } from '@package/constants';

export const clearSystemContext = () => {
  systemContext.modules = {};
  systemContext.global.handlers = {};
};

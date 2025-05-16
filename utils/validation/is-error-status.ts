import { STATUS_HANDLERS } from '../../package/src/utils/handler';

export const isErrorStatus = (status: number | string | null): status is keyof typeof STATUS_HANDLERS => {
  return status ? status in STATUS_HANDLERS : false;
};

export const isFunction = (input: any): input is (...args: any[]) => any => {
  return typeof input === 'function' && !/^\s*class\s+/.test(input.toString());
};

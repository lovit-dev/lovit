export const isObject = (input: any): input is Record<string, any> => {
  return (
    typeof input === 'object' &&
    input !== null &&
    !Array.isArray(input) &&
    !(input instanceof Date) &&
    !(input instanceof RegExp)
  );
};

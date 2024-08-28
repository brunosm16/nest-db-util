export const isValidArray = (value: unknown) => {
  return Array.isArray(value) && value.length > 0;
};

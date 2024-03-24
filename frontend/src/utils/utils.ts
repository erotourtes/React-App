export const strDateFormat = (str?: string): string => {
  return str ? new Date(str).toDateString() : "";
};

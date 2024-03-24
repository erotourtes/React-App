export const strDateFormat = (str?: string): string => {
  return str ? new Date(str).toDateString() : "";
};

export const inputChange =
  (setInput: (str: string) => void) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

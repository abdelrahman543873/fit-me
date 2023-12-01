export const utcStandardDateTransformer = (input) => {
  const cleanedInput = input.value.replace(/["]/g, '');
  if (new Date(cleanedInput)) {
    const date = new Date(cleanedInput);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  return input.value;
};

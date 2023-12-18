export const utcStandardDateTransformer = (input) => {
  const cleanedInput = input.value.replace(/["]/g, '');
  if (new Date(cleanedInput)) {
    const date = new Date(cleanedInput);
    return date;
  }
  return input.value;
};

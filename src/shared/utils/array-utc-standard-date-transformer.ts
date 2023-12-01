export const arrayUtcStandardDateTransformer = (input) => {
  const dateArray = [];
  for (const date of input.value) {
    const typedDate = new Date(date.replace(/["]/g, ''));
    typedDate.setHours(0, 0, 0, 0);
    dateArray.push(typedDate);
  }
  return dateArray;
};

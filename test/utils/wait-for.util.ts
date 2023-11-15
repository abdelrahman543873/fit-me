export const waitForMilliSeconds = (milliSeconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliSeconds));
};

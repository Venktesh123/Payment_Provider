export const retryDelay = (
  attempt: number,
): number => {
  const base = 1000;

  return (
    base * Math.pow(2, attempt) +
    Math.random() * 500
  );
};
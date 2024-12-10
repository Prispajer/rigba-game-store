export const generateRandomName = (): string => {
  return Math.random().toString(36).substring(2);
};

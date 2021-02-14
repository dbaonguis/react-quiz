export const shuffleChoices: (choices: string[]) => string[] = (choices: string[]) => {
  return [...choices].sort(() => Math.random() - 0.5);
};

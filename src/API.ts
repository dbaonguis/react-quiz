import { shuffleChoices } from './utils';

// https://opentdb.com/api.php?amount=10&type=multiple
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionWithChoices = Question & { choices: string[] };

export const fetchQuizQuestions: (amount: number, difficulty: Difficulty) => Promise<QuestionWithChoices[]> = async (
  amount,
  difficulty,
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  if (data && data.response_code === 0) {
    return data.results.map((question: Question) => ({
      ...question,
      choices: shuffleChoices([question.correct_answer, ...question.incorrect_answers]),
    }));
  }

  return null;
};

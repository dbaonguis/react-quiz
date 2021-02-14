import React from 'react';
import { UserAnswer } from './../App';

type Props = {
  question: string;
  choices: string[];
  callback: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: UserAnswer | undefined | null;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({ question, choices, callback, userAnswer, questionNumber, totalQuestions }: Props) => (
  <div>
    <p className='number'>
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {choices?.map((choice, idx) => (
        <div key={idx}>
          <button disabled={!!userAnswer} onClick={callback} value={choice}>
            <span dangerouslySetInnerHTML={{ __html: choice }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;

import React from 'react';

interface Props {
  question: string;
  choices: string[];
  callback: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, choices, callback, userAnswer, questionNumber, totalQuestions }: Props) => (
  <div>
    <p className='number'>
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {choices?.map((choice, idx) => (
        <div key={idx}>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: choice }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;

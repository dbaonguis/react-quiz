import React from 'react';
import { UserAnswer } from './../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  choices: string[];
  callback: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: UserAnswer | undefined | null;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({ question, choices, callback, userAnswer, questionNumber, totalQuestions }: Props) => (
  <Wrapper>
    <p className='number'>
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {choices?.map((choice, idx) => (
        <ButtonWrapper key={idx} correct={userAnswer?.correctAnswer === choice} userClicked={!!userAnswer}>
          <button disabled={!!userAnswer} onClick={callback} value={choice}>
            <span dangerouslySetInnerHTML={{ __html: choice }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;

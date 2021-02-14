import React, { useState } from 'react';
// Components
import QuestionCard from './components/QuestionCard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    console.log('start');
  };

  const checkAnswer = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('check value');
  };

  const nextQuestion = () => {
    console.log('next question');
  };

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'>Score:</p>
      <p>Loading Questions...</p>
      <QuestionCard
        questionNumber={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        // question={questions[questionNumber].question}
        // choices={questions[questionNumber].choices}
        question={`What is your name?`}
        choices={['Ewan ko sa iyo', 'Gago ka', 'Ulol ka', 'WTF']}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={checkAnswer}
      />
      <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default App;

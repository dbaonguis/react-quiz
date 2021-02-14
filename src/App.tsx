import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions, Difficulty, QuestionWithChoices } from './API';
// Components
import QuestionCard from './components/QuestionCard';

type UserAnswer = {
  questionNumber: number;
  question: string;
  correctAnswer: string;
  answer: string;
  isCorrect: boolean;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionWithChoices[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const TOTAL_QUESTIONS = 10;

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
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
      <button className='start' onClick={startQuiz}>
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

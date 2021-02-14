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
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (!loading && questions.length === TOTAL_QUESTIONS) {
      console.log('fetched questions', questions);
    }
  }, [loading, questions]);

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

  const checkAnswer = (evt: React.MouseEvent<HTMLButtonElement>) => {
    console.log('check value');
  };

  const nextQuestion = () => {
    console.log('next question');
  };

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button className='start' onClick={startQuiz}>
          Start
        </button>
      )}
      {!gameOver && <p className='score'>Score: ???</p>}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber].question}
          choices={questions[questionNumber].choices}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 && (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default App;

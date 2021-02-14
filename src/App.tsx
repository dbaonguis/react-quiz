import React, { useState, useEffect } from 'react';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { fetchQuizQuestions, Difficulty, QuestionWithChoices } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type UserAnswer = {
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
    if (!gameOver) {
      // get users chosen answer
      const chosenAnswer = evt.currentTarget.value;
      // check answer against correct_answer
      const correct = questions[questionNumber].correct_answer === chosenAnswer;
      // add score if answer is correct
      if (correct) setScore(prevScore => prevScore + 1);
      // save answer in the array for user answers
      const userAnswer = {
        questionNumber: questionNumber + 1,
        question: questions[questionNumber].question,
        correctAnswer: questions[questionNumber].correct_answer,
        answer: chosenAnswer,
        isCorrect: correct,
      };
      setUserAnswers(prevArray => [...prevArray, userAnswer]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestionNumber);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startQuiz}>
            Start
          </button>
        )}
        {!gameOver && <p className='score'>Score: {score}</p>}
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
      </Wrapper>
    </>
  );
};

export default App;

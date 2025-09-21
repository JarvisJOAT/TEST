'use client';

import { useState, useEffect } from 'react';

// Define the type for a single question
interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

// Function to shuffle an array and take the first n elements
function getShuffledQuiz(questions: Question[], count: number): Question[] {
  const totalQuestions = Math.min(count, questions.length);
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
}

export function QuizClient({ allQuestions, quizTitle }: { allQuestions: Question[], quizTitle: string }) {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const newQuiz = getShuffledQuiz(allQuestions, 5);
    setQuizData(newQuiz);
    setUserAnswers(Array(newQuiz.length).fill(null));
    setMarkedQuestions(Array(newQuiz.length).fill(false));
  }, [allQuestions]);

  const handleAnswerSelection = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleMarkQuestion = () => {
    const newMarked = [...markedQuestions];
    newMarked[currentQuestion] = !newMarked[currentQuestion];
    setMarkedQuestions(newMarked);
  };

  const handlePaletteClick = (index: number) => {
    setCurrentQuestion(index);
  };
  
  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const restartQuiz = () => {
    const newQuiz = getShuffledQuiz(allQuestions, 5);
    setQuizData(newQuiz);
    setCurrentQuestion(0);
    setUserAnswers(Array(newQuiz.length).fill(null));
    setMarkedQuestions(Array(newQuiz.length).fill(false));
    setShowResult(false);
  };

  const allQuestionsAnswered = userAnswers.every(answer => answer !== null);

  if (quizData.length === 0) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p>Loading Quiz...</p>
        </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 md:p-24">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-black">{quizTitle}</h1>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black">Your Score: {calculateScore()} out of {quizData.length}</h2>
            <button
              onClick={restartQuiz}
              className="mt-6 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 grid grid-cols-5 gap-2 rounded-lg bg-gray-100 p-4">
              {quizData.map((_, index) => {
                const isAnswered = userAnswers[index] !== null;
                const isMarked = markedQuestions[index];
                const isCurrent = index === currentQuestion;
                let bgColor = 'bg-white';
                if (isCurrent) bgColor = 'bg-blue-200';
                else if (isAnswered) bgColor = 'bg-green-200';
                
                return (
                  <button
                    key={index}
                    onClick={() => handlePaletteClick(index)}
                    className={`flex h-10 w-full items-center justify-center rounded-md border text-sm font-semibold ${bgColor} ${isMarked ? 'border-yellow-500 border-2' : 'border-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="mb-4 text-sm text-gray-600">Question {currentQuestion + 1} of {quizData.length}</div>
            <h2 className="mb-6 text-2xl font-semibold text-black">{quizData[currentQuestion].text}</h2>
            <div className="flex flex-col space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                  className={`rounded-lg border p-4 text-left text-black transition-colors ${
                    userAnswers[currentQuestion] === index ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-500' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="rounded-md bg-gray-500 px-5 py-2 font-bold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleMarkQuestion}
                className={`rounded-md px-5 py-2 font-bold ${markedQuestions[currentQuestion] ? 'bg-yellow-400 text-black' : 'bg-yellow-200 text-black'}`}
              >
                {markedQuestions[currentQuestion] ? 'Unmark' : 'Mark for Review'}
              </button>
              {currentQuestion < quizData.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={userAnswers[currentQuestion] === null}
                  className="rounded-md bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className="rounded-md bg-green-500 px-5 py-2 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

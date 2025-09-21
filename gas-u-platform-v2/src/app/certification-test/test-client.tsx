'use client';

import { useState, useEffect } from 'react';

// Define the type for a single question
interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

// Function to shuffle an array and take the first n elements
function getShuffledTest(questions: Question[], count: number): Question[] {
  const totalQuestions = Math.min(count, questions.length);
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
}

const PASS_PERCENTAGE = 80;

export function TestClient({ allQuestions }: { allQuestions: Question[] }) {
  const [testData, setTestData] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const newTest = getShuffledTest(allQuestions, 50);
    setTestData(newTest);
    setUserAnswers(Array(newTest.length).fill(null));
    setMarkedQuestions(Array(newTest.length).fill(false));
  }, [allQuestions]);

  const handleAnswerSelection = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < testData.length - 1) {
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
    testData.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const restartTest = () => {
    const newTest = getShuffledTest(allQuestions, 50);
    setTestData(newTest);
    setCurrentQuestion(0);
    setUserAnswers(Array(newTest.length).fill(null));
    setMarkedQuestions(Array(newTest.length).fill(false));
    setShowResult(false);
  };

  const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
  const finalScore = calculateScore();
  const scorePercentage = testData.length > 0 ? (finalScore / testData.length) * 100 : 0;
  const hasPassed = scorePercentage >= PASS_PERCENTAGE;

  if (testData.length === 0) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p>Loading Test...</p>
        </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 md:p-24">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-black">GAS U Certification Test</h1>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold">Test Complete</h2>
            <p className="mt-4 text-xl">Your Score: {finalScore} out of {testData.length} ({scorePercentage.toFixed(0)}%)</p>
            {hasPassed ? (
              <div className="mt-8 rounded-lg border-2 border-green-500 bg-green-50 p-6">
                <h3 className="text-3xl font-bold text-green-700">Congratulations! You Passed!</h3>
                <p className="mt-2 text-lg">You have earned the GAS U Automation Fundamentals Certificate.</p>
              </div>
            ) : (
              <div className="mt-8 rounded-lg border-2 border-red-500 bg-red-50 p-6">
                <h3 className="text-3xl font-bold text-red-700">Try Again</h3>
                <p className="mt-2 text-lg">You did not meet the {PASS_PERCENTAGE}% threshold to pass. Review the course materials and try again!</p>
              </div>
            )}
            <button
              onClick={restartTest}
              className="mt-8 rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Take Again
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 grid grid-cols-10 gap-2 rounded-lg bg-gray-100 p-4">
              {testData.map((_, index) => {
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
                    className={`flex h-8 w-full items-center justify-center rounded-md border text-xs font-semibold ${bgColor} ${isMarked ? 'border-yellow-500 border-2' : 'border-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="mb-4 text-sm text-gray-600">Question {currentQuestion + 1} of {testData.length}</div>
            <h2 className="mb-6 text-2xl font-semibold text-black">{testData[currentQuestion].text}</h2>
            <div className="flex flex-col space-y-3">
              {testData[currentQuestion].options.map((option, index) => (
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
              {currentQuestion < testData.length - 1 ? (
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
                  Finish Test
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

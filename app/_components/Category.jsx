"use client";

import React from "react";
import Question from "@/app/_components/Question";

const Category = ({
  category,
  onNext,
  onPrevious,
  isLastCategory,
  answers,
  setAnswers,
}) => {
  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const allQuestionsAnswered = category.questions.every(
    (q) => answers[q.id] !== undefined
  );

  const answeredQuestionsCount = category.questions.filter(
    (q) => answers[q.id] !== undefined
  ).length;

  return (
    <div className="px-6 md:px-12 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold">{category.title}</h2>
        <p className="text-sm text-gray-500">
          Question {answeredQuestionsCount} of {category.questions.length}
        </p>
      </div>
      <p className="text-gray-500 mb-4">{category.description}</p>
      {category.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          userAnswer={answers[question.id]}
        />
      ))}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full"
          onClick={onPrevious}
          disabled={category.id === 1}
        >
          Previous
        </button>
        <button
          className={`${
            allQuestionsAnswered ? "bg-primary" : "bg-gray-300"
          } text-white px-4 py-2 rounded-full`}
          onClick={onNext}
          disabled={!allQuestionsAnswered}
        >
          {isLastCategory ? "Submit Answers" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Category;

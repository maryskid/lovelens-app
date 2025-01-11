"use client";

import React from "react";
import Question from "@/app/_components/Question";
import { guthenBloots, recoleta } from '@/fonts/typo';

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
      <div className="flex justify-between md:justify-around lg:justify-between lg:px-24 items-center w-full lg:w-4/5  mt-6 mx-auto mb-1  lg:mb-2  ">
        <div>
          <h2 className={`${recoleta.className} text-lg md:text-xl font-bold`}>{category.title}</h2>
          <p className="text-sm md:text-base text-gray-500 mb-4">{category.description}</p>
        </div>
        <p className={`${guthenBloots.className} text-sm text-gray-500`}>
          Question {answeredQuestionsCount} of {category.questions.length}
        </p>
      </div>
      {category.questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          userAnswer={answers[question.id]}
          isLastQuestion={index === category.questions.length - 1}
        />
      ))}
      <div className="flex justify-between mt-6 md:w-4/5 mx-auto md:px-16 lg:px-20">
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

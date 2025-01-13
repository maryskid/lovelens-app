"use client";

import React, { useState, useEffect, useRef } from "react";
import Question from "@/app/_components/Question";
import { guthenBloots, recoleta } from "@/fonts/typo";

const Category = ({
  category,
  onNext,
  onPrevious,
  isLastCategory,
  answers,
  setAnswers,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionRefs = useRef([]);

  // Handle answering a question and automatically move to the next
  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));

    // Automatically scroll to the next question or focus on the current one if it's last
    setTimeout(() => {
      if (currentQuestionIndex < category.questions.length - 1) {
        questionRefs.current[currentQuestionIndex + 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Keep focus on the last question
        questionRefs.current[currentQuestionIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  // Handle moving to the next category
  const handleNextCategory = () => {
    // Call onNext first to change the questions
    onNext();
    
    // Immediately reset the question index and scroll
    setCurrentQuestionIndex(0);
    
    // Use requestAnimationFrame to ensure the DOM has updated
    requestAnimationFrame(() => {
      const firstQuestion = questionRefs.current[0];
      if (firstQuestion) {
        const offsetTop =
          firstQuestion.getBoundingClientRect().top + window.scrollY - 200;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  };

  // Effect to update question index when manually scrolling
  useEffect(() => {
    const handleManualScroll = () => {
      const firstUnansweredIndex = category.questions.findIndex(
        (q) => answers[q.id] === undefined
      );

      if (firstUnansweredIndex !== -1 && firstUnansweredIndex !== currentQuestionIndex) {
        questionRefs.current[firstUnansweredIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setCurrentQuestionIndex(firstUnansweredIndex);
      }
    };

    const container = document;
    container.addEventListener("scroll", handleManualScroll);

    return () => {
      container.removeEventListener("scroll", handleManualScroll);
    };
  }, [currentQuestionIndex]);

  return (
    <div className="px-6 md:px-12 py-8">
      {/* Category Header */}
      <div className="flex justify-between md:justify-around lg:justify-between lg:px-24 items-center w-full lg:w-4/5 mt-6 mx-auto mb-1 lg:mb-2">
        <div>
          <h2 className={`${recoleta.className} text-lg md:text-xl font-bold`}>
            {category.title}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-4">{category.description}</p>
        </div>
        <p className={`${guthenBloots.className} text-sm text-gray-500`}>
          Question {currentQuestionIndex + 1} of {category.questions.length}
        </p>
      </div>

      {/* Questions */}
      <div className="flex flex-col space-y-8">
        {category.questions.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => (questionRefs.current[index] = el)}
            className={`transition-opacity duration-300 ${
              index === currentQuestionIndex ? "opacity-100" : "opacity-50 grayscale"
            }`}
          >
            <Question
              question={question}
              onAnswer={handleAnswer}
              userAnswer={answers[question.id]}
              isLastQuestion={index === category.questions.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 md:w-4/5 mx-auto md:px-16 lg:px-20">
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-xl"
          onClick={onPrevious}
          disabled={category.id === 1}
        >
          Previous
        </button>
        <button
          className={`${
            category.questions.every((q) => answers[q.id] !== undefined)
              ? "bg-primary"
              : "bg-gray-300"
          } text-white px-4 py-2 rounded-xl`}
          onClick={isLastCategory ? onNext : handleNextCategory}
          disabled={!category.questions.every((q) => answers[q.id] !== undefined)}
        >
          {isLastCategory ? "Submit Answers" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Category;
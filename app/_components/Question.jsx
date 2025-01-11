"use client";

import React from "react";
import { recoleta } from "@/fonts/typo";
import { Check } from "lucide-react"; 

const Question = ({ question, onAnswer, userAnswer, isLastQuestion }) => {
  // Define scale for the dots
  const scale = [-3, -2, -1, 0, 1, 2, 3];

  // Size map for mobile
  const mobileSizeMap = {
    "-3": "w-10 h-10",
    "-2": "w-8 h-8",
    "-1": "w-6 h-6",
    "0": "w-4 h-4",
    "1": "w-6 h-6",
    "2": "w-8 h-8",
    "3": "w-10 h-10",
  };

  // Size map for medium and larger screens
  const desktopSizeMap = {
    "-3": "md:w-14 md:h-14",
    "-2": "md:w-12 md:h-12",
    "-1": "md:w-10 md:h-10",
    "0": "md:w-8 md:h-8",
    "1": "md:w-10 md:h-10",
    "2": "md:w-12 md:h-12",
    "3": "md:w-14 md:h-14",
  };

  // Combine size maps for responsive behavior
  const getSizeClass = (value) => {
    return `${mobileSizeMap[value]} ${desktopSizeMap[value]}`;
  };

  // Border and fill styles for different positions
  const styleMap = {
    left: "border-blue-500", // Left side dots
    neutral: "border-gray-500", // Neutral dot
    right: "border-orange-500", // Right side dots
    selectedLeft: "bg-blue-500 text-white", // Selected left dot
    selectedNeutral: "bg-gray-500 text-white", // Selected neutral dot
    selectedRight: "bg-orange-500 text-white", // Selected right dot
  };

  const getDotStyle = (value) => {
    if (value === 0) {
      return userAnswer === value ? styleMap.selectedNeutral : styleMap.neutral;
    } else if (value < 0) {
      return userAnswer === value ? styleMap.selectedLeft : styleMap.left;
    } else {
      return userAnswer === value ? styleMap.selectedRight : styleMap.right;
    }
  };

  return (
    <div className="py-10">
      {/* Question text */}
      <p
        className={`${recoleta.className} text-lg md:text-xl font-medium text-center mb-6 md:mb-8 w-11/12 md:w-3/4 lg:w-2/3 mx-auto`}
      >
        {question.text}
      </p>

      {/* Buttons and Labels */}
      <div className="flex flex-col items-center space-y-4">
        {/* Labels */}
        <div className="flex justify-between w-11/12 md:w-3/4 lg:w-2/3 mx-auto">
          <span className="text-sm md:text-base text-gray-500 text-left md:text-center">
            {question.left}
          </span>
          <span className="text-sm md:text-base text-gray-500 text-right md:text-center">
            {question.right}
          </span>
        </div>

        {/* Line and Circles */}
        <div className="relative w-11/12 md:w-3/4 lg:w-2/3 mx-auto">
          {/* Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

          {/* Circles */}
          <div className="flex justify-between items-center relative z-10">
            {scale.map((value) => (
              <button
                key={value}
                onClick={() => onAnswer(question.id, value)}
                className={`${getSizeClass(value)} rounded-full border flex items-center justify-center ${
                  userAnswer === value
                    ? `${getDotStyle(value)}`
                    : `${getDotStyle(value)} bg-white`
                } transition`}
              >
                {userAnswer === value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      {!isLastQuestion && (
        <div className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto mt-10 border-b border-gray-300"></div>
      )}
    </div>
  );
};

export default Question;

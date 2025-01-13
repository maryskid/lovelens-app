import React from "react";
import { recoleta } from "@/fonts/typo";

const CategoryCard = ({
  name,
  subtitle,
  alignmentPercentage,
  icon,
  alignmentText,
  growthOpportunity,
  color,
}) => {
  // Calculate the circumference of the circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (alignmentPercentage / 100) * circumference;

  return (
    <div
      className="bg-white shadow-lg rounded-xl p-6 flex flex-col space-y-4 border-t-4 hover:shadow-xl transition-shadow duration-300"
      style={{ borderColor: color }}
    >
      {/* Title, Subtitle, and Circular Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between md:space-x-4">
        {/* Title and Subtitle */}
        <div className="flex items-start space-x-4 w-full">
          <div className="relative">
            <img
              src={icon}
              alt={`${name} icon`}
              className="w-14 h-14 flex-shrink-0"
            />
            <div 
              className="absolute -inset-1 rounded-lg opacity-20"
              style={{ backgroundColor: color }}
            ></div>
          </div>
          <div className="flex-1">
            <h3
              className={`${recoleta.className} text-lg font-bold text-gray-800 text-left`}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-500 text-left">{subtitle}</p>
          </div>
        </div>

        {/* Improved Circular Progress Bar */}
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center mt-4 md:mt-0 mx-auto md:mx-0">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"  // Tailwind gray-200
              strokeWidth="10"
              className="transition-all duration-300"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                transformOrigin: '50% 50%',
                transform: 'rotate(-90deg)',
              }}
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-sm font-bold" style={{ color }}>
              {alignmentPercentage}%
            </p>
            <p className="text-xs text-gray-500">Aligned</p>
          </div>
        </div>
      </div>

      {/* Alignment and Growth Opportunity Section */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4 mt-4">
        {/* Alignment */}
        <div>
          <h4
            className="text-sm font-semibold mb-1"
            style={{ color }}
          >
            Alignment
          </h4>
          <p className="text-sm text-gray-600">{alignmentText}</p>
        </div>

        {/* Growth Opportunity */}
        <div>
          <h4
            className="text-sm font-semibold mb-1"
            style={{ color }}
          >
            Growth Opportunity
          </h4>
          <p className="text-sm text-gray-600">{growthOpportunity}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
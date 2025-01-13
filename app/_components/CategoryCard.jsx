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
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 border-t-4"
      style={{ borderColor: color }}
    >
      {/* Title, Subtitle, and Circular Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between md:space-x-4">
        {/* Title and Subtitle */}
        <div className="flex items-start space-x-4 w-full">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-14 h-14 flex-shrink-0"
          />
          <div className="flex-1">
            <h3
              className={`${recoleta.className} text-lg font-bold text-gray-800 text-left`}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-500 text-left">{subtitle}</p>
          </div>
        </div>

        {/* Circular Progress Bar */}
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center mt-4 md:mt-0 mx-auto md:mx-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray="282.6"
              strokeDashoffset={`${
                282.6 - (alignmentPercentage / 100) * 282.6
              }`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-sm font-bold" style={{ color: color }}>
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
            style={{ color: color }}
          >
            Alignment
          </h4>
          <p className="text-sm text-gray-600">{alignmentText}</p>
        </div>

        {/* Growth Opportunity */}
        <div>
          <h4
            className="text-sm font-semibold mb-1"
            style={{ color: color }}
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

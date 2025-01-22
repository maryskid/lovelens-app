import React from "react";
import { recoleta } from "@/fonts/typo";
import { ChevronDown, ChevronUp } from "lucide-react";

const PersonalityCard = ({ person, isExpanded, onToggle, selectedTrait, onSelectTrait }) => {
  const traitColors = {
    "Organizational Style": "#F97316",
    "Communication Approach": "#10B981",
    "Intimacy Dynamics": "#F59E0B",
    "Growth Orientation": "#8B5CF6",
    "Social Interaction": "#3B82F6",
    "Future Vision": "#06B6D4",
    "Parenting Philosophy": "#EC4899",
    "Financial Mindset": "#EF4444",
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${isExpanded ? "h-auto" : "h-fit"}`}>
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={person.avatar}
            alt={`${person.name}'s Avatar`}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-100"
          />
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>
        <div>
          <h3 className={`${recoleta.className} text-xl font-bold text-gray-800 mb-1`}>
            {person.name}'s Traits
          </h3>
          <p className="text-sm text-gray-600">{person.description}</p>
        </div>
      </div>

      {/* Selected Trait Card */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent opacity-50 -mr-8 -mt-8 rounded-bl-full"></div>
        <div className="relative">
          <h3 className={`${recoleta.className} text-lg font-bold mb-3 text-gray-800`}>
            {selectedTrait.name}
          </h3>
          <h4 
            className="text-2xl font-bold mb-4 flex items-center" 
            style={{ color: traitColors[selectedTrait.name] }}
          >
            {selectedTrait.labels[
              Object.keys(selectedTrait.labels).find(
                (key) => selectedTrait.labels[key].isDominant
              )
            ]?.value}
            %{" "}
            <span className="ml-2">
              {Object.keys(selectedTrait.labels).find(
                (key) => selectedTrait.labels[key].isDominant
              )}
            </span>
          </h4>
          {/*<p className="text-gray-600 leading-relaxed">{selectedTrait.description}</p>*/}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center space-x-2 w-full mb-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <span>{isExpanded ? "Show Less" : "See More"}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Progress Bars */}
      <div className="space-y-4">
        {person.traits
          .slice(0, isExpanded ? person.traits.length : 3)
          .map((trait) => {
            const dominantLabel = Object.entries(trait.labels).find(
              ([, data]) => data.isDominant
            );
            const nonDominantLabel = Object.entries(trait.labels).find(
              ([, data]) => !data.isDominant
            );

            return (
              <div
                key={trait.name}
                onClick={() => onSelectTrait(trait)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = selectedTrait.name === trait.name
                    ? `${traitColors[trait.name]}33`
                    : `${traitColors[trait.name]}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = selectedTrait.name === trait.name
                    ? `${traitColors[trait.name]}33`
                    : 'transparent';
                }}
                className={`p-3 rounded-lg transition-all duration-200 cursor-pointer`}
                style={{
                  backgroundColor:
                    selectedTrait.name === trait.name
                      ? `${traitColors[trait.name]}33`
                      : "transparent"
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{trait.name}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: traitColors[trait.name] }}
                  >
                    {dominantLabel[1].value}% {dominantLabel[0]}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: traitColors[trait.name],
                      width: `${dominantLabel[1].value}%`,
                      [dominantLabel[0] === "right" ? "right" : "left"]: "0",
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{nonDominantLabel[0]}</span>
                  <span>{dominantLabel[0]}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PersonalityCard;
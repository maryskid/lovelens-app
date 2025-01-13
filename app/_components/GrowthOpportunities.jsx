import React from "react";
import { recoleta } from "@/fonts/typo";
import { Sprout, Users, ArrowUp } from "lucide-react";

const GrowthOpportunities = ({ firstUser, secondUser, togetherOpportunity }) => {
  return (
    <div className="space-y-6 px-6 md:px-24 py-8">
      {/* Title Section */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold mr-4">
          4
        </div>
        <h2 className={`${recoleta.className} text-2xl font-bold text-gray-800`}>
          Growth Opportunities
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card for firstUser */}
        <div className="bg-white shadow-md rounded-lg p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50 -mr-8 -mt-8"></div>
          <div className="relative">
            <Sprout className="w-6 h-6 text-orange-500 mb-3" />
            <h3 className="text-lg font-semibold text-orange-500 mb-2">For {firstUser.name}</h3>
            <p className="text-gray-700">{firstUser.growthOpportunity}</p>
          </div>
        </div>

        {/* Card for secondUser */}
        <div className="bg-white shadow-md rounded-lg p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50 -mr-8 -mt-8"></div>
          <div className="relative">
            <ArrowUp className="w-6 h-6 text-orange-500 mb-3" />
            <h3 className="text-lg font-semibold text-orange-500 mb-2">For {secondUser.name}</h3>
            <p className="text-gray-700">{secondUser.growthOpportunity}</p>
          </div>
        </div>

        {/* Card for Together */}
        <div className="bg-white shadow-md rounded-lg p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50 -mr-8 -mt-8"></div>
          <div className="relative">
            <Users className="w-6 h-6 text-orange-500 mb-3" />
            <h3 className="text-lg font-semibold text-orange-500 mb-2">Together</h3>
            <p className="text-gray-700">{togetherOpportunity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthOpportunities;
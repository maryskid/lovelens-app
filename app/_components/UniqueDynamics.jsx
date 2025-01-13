import React from "react";
import { recoleta } from "@/fonts/typo";
import { Fingerprint } from "lucide-react";

const UniqueDynamics = ({ uniqueDynamics }) => {
  return (
    <div className="space-y-6 px-6 md:px-24 py-8">
      {/* Title Section */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-500 font-bold mr-4 shadow-sm">
          3
        </div>
        <h2 className={`${recoleta.className} text-2xl font-bold text-gray-800`}>
          {uniqueDynamics.title}
        </h2>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-50 rounded-tr-full opacity-50 -ml-8 -mb-8"></div>
        
        <div className="relative">
          {/* Icon */}
          <div className="flex items-center mb-6">
            <Fingerprint className="w-8 h-8 text-green-500 mr-3" />
            <div className="h-px flex-grow bg-gradient-to-r from-green-200 to-transparent"></div>
          </div>

          {/* Content */}
          <p className="text-gray-700 text-lg leading-relaxed">
            {uniqueDynamics.description}
          </p>

          {/* Optional Quote Mark */}
          <div className="absolute -right-2 -bottom-2 text-8xl text-green-100 font-serif">
            "
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueDynamics;
"use client";

import React from "react";
import { Save, Sparkles, ChevronRight } from "lucide-react";

const NextChapterSection = () => {
  const handleSaveReport = () => {
    alert("Report Saved!");
  };

  return (
    <div className="px-6 md:px-24 pt-8 pb-16">
      <div className="bg-primary relative overflow-hidden rounded-2xl px-8 py-10 shadow-xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Text Content */}
          <div className="text-left mb-8 md:mb-0 md:pr-8">
            <div className="flex items-center mb-2 text-white/80">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm uppercase tracking-wider font-medium">Growth Journey</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Your Next Chapter Awaits
            </h2>
            <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed">
              Save this report to track your growth over time and unlock insights about your relationship journey.
            </p>
          </div>

          {/* Save Button with Animation */}
          <div className="flex-shrink-0">
            <button
              onClick={handleSaveReport}
              className="group bg-white text-primary font-semibold py-4 px-8 
                rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                flex items-center space-x-3 mx-auto md:mx-0
                hover:bg-opacity-95 transform hover:-translate-y-0.5"
            >
              <Save className="w-5 h-5" />
              <span>Save Report</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextChapterSection;
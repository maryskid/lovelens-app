'use client';
import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Glasses, Scale } from "lucide-react";
import { recoleta, guthenBloots } from "@/fonts/typo";

const ProcessingResults = ({ isPartner }) => {
  const [progress, setProgress] = useState({
    step1: 'pending',
    step2: 'pending',
    step3: 'pending'
  });

  const [fillPercentage, setFillPercentage] = useState({
    step1: 0,
    step2: 0,
    step3: 0
  });

  // Automatically scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the window

    // Step 1 becomes active immediately
    setProgress(prev => ({ ...prev, step1: 'active' }));
    setFillPercentage(prev => ({ ...prev, step1: 100 }));

    // Step 2 starts after 3 seconds
    const step2Timer = setTimeout(() => {
      setProgress(prev => ({ ...prev, step1: 'completed', step2: 'active' }));
      setFillPercentage(prev => ({ ...prev, step2: 100 }));
    }, 3000);

    // Step 3 starts after 6 seconds
    const step3Timer = setTimeout(() => {
      setProgress(prev => ({ ...prev, step2: 'completed', step3: 'active' }));
      setFillPercentage(prev => ({ ...prev, step3: 80 }));
    }, 6000);

    // Cleanup function to clear timers when component unmounts
    return () => {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50 rounded-full -ml-24 -mb-24 blur-3xl"></div>

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 relative">
                <Heart 
                  className="w-10 h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite]" 
                />
                <div className="absolute inset-0 bg-orange-200 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20"></div>
              </div>
              <h1 className={`${recoleta.className} text-3xl font-bold text-gray-800 mb-3`}>
                {isPartner ? "Processing Your Results" : "Creating Your Connection"}
              </h1>
              <div className={`${guthenBloots.className} text-primary/80`}>
                Journey in Progress
              </div>
            </div>

            {/* Processing Steps */}
            <div className="space-y-6 mb-12">
              {[
                {
                  icon: Glasses,
                  text: "Analyzing Your Perspectives",
                  status: progress.step1,
                  fill: fillPercentage.step1
                },
                {
                  icon: Scale,
                  text: "Finding Connection Points",
                  status: progress.step2,
                  fill: fillPercentage.step2
                },
                {
                  icon: Sparkles,
                  text: isPartner ? "Generating Couple Insights" : "Preparing Your Code",
                  status: progress.step3,
                  fill: fillPercentage.step3
                },
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-700
                    ${step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'active' ? 'bg-primary text-white animate-[pulse_3s_ease-in-out_infinite]' : 
                      'bg-gray-100 text-gray-400'}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-2000
                          ${step.status === 'completed' ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${step.fill}%` }}
                      />
                    </div>
                    <p className={`mt-2 transition-colors duration-300
                      ${step.status !== 'pending' ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="text-center text-gray-600">
              <p className="mb-4">
                {isPartner 
                  ? "Your insights are being crafted with care" 
                  : "Almost ready to share with your partner"}
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingResults;

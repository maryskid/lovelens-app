'use client'
import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Glasses, Scale } from "lucide-react";
import { recoleta, guthenBloots } from "@/fonts/typo";


const CircularProgress = ({ progress, icon: Icon, status, text }) => {
  const circumference = 2 * Math.PI * 40; // radius is 40
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
            r="40"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={`transition-all duration-1000 ease-in-out ${
              status === 'completed' ? 'text-green-500' : 'text-primary'
            }`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        
        {/* Icon container */}
        <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-700 ${
          status === 'completed' ? 'text-green-500' : 
          status === 'active' ? 'text-primary' : 
          'text-gray-400'
        }`}>
          <Icon className={`w-8 h-8 ${
            status === 'active' ? "animate-[pulse_2s_ease-in-out_infinite]" : ""
          }`} />
        </div>
      </div>
      
      <p className={`text-center font-medium transition-colors duration-300 ${
        status !== 'pending' ? 'text-gray-800' : 'text-gray-400'
      }`}>
        {text}
      </p>
    </div>
  );
};

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

  useEffect(() => {
    window.scrollTo(0, 0);

    setProgress(prev => ({ ...prev, step1: 'active' }));
    setFillPercentage(prev => ({ ...prev, step1: 100 }));

    const step2Timer = setTimeout(() => {
      setProgress(prev => ({ ...prev, step1: 'completed', step2: 'active' }));
      setFillPercentage(prev => ({ ...prev, step2: 100 }));
    }, 3000);

    const step3Timer = setTimeout(() => {
      setProgress(prev => ({ ...prev, step2: 'completed', step3: 'active' }));
      setFillPercentage(prev => ({ ...prev, step3: 80 }));
    }, 6000);

    return () => {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    };
  }, []);

  const steps = [
    {
      icon: Glasses,
      text: "Analyzing your perspectives",
      status: progress.step1,
      fill: fillPercentage.step1
    },
    {
      icon: Scale,
      text: "Finding connection points",
      status: progress.step2,
      fill: fillPercentage.step2
    },
    {
      icon: Sparkles,
      text: isPartner ? "Generating your couple insights" : "Preparing your unique code",
      status: progress.step3,
      fill: fillPercentage.step3
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50 rounded-full -ml-24 -mb-24 blur-3xl" />

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 relative">
                <Heart 
                  className="w-10 h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite]" 
                />
                <div className="absolute inset-0 bg-orange-200 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" />
              </div>
              <h1 className={`${recoleta.className} text-3xl font-bold text-gray-800 mb-3`}>
                {isPartner ? "Processing your results" : "Creating your connection"}
              </h1>
              <div className={`${guthenBloots.className} text-primary/80`}>
                Journey in Progress
              </div>
            </div>

            {/* Circular Progress Steps */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {steps.map((step, index) => (
                <CircularProgress
                  key={index}
                  progress={step.fill}
                  icon={step.icon}
                  status={step.status}
                  text={step.text}
                />
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
                    style={{ animationDelay: `${i * 70}ms` }}
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
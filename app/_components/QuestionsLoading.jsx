import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { recoleta, guthenBloots } from "@/fonts/typo";

const QuestionsLoading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full -ml-36 -mb-36 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Heart Animation Container */}
        <div className="relative h-32 w-32 mx-auto">
          {/* Pulsing Circles */}
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-[pulse_3s_linear_infinite]"></div>
          <div className="absolute inset-4 bg-primary/10 rounded-full animate-[pulse_3s_linear_infinite] delay-150"></div>
          <div className="absolute inset-8 bg-primary/15 rounded-full animate-[pulse_3s_linear_infinite] delay-300"></div>
          
          {/* Central Heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart 
              className="w-12 h-12 text-primary animate-[beat_2s_ease-in-out_infinite]" 
              fill="currentColor"
            />
          </div>

          {/* Floating Hearts */}
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
            {[0, 72, 144, 216, 288].map((degree, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${degree}deg) translateY(-32px)`,
                }}
              >
                <Heart 
                  className="w-4 h-4 text-primary/40" 
                  fill="currentColor"
                />
              </div>
            ))}
          </div>

          {/* Sparkle Effects */}
          {[45, 135, 225, 315].map((degree, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: `${50 + 40 * Math.sin(degree * Math.PI / 180)}%`,
                left: `${50 + 40 * Math.cos(degree * Math.PI / 180)}%`,
              }}
            >
              <Sparkles 
                className={`w-4 h-4 text-primary/60 animate-[twinkle_1.5s_ease-in-out_infinite]`}
                style={{ animationDelay: `${index * 0.4}s` }}
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="mt-12 text-center">
          <h2 className={`${recoleta.className} text-2xl text-gray-800 font-bold mb-2`}>
            Preparing Your Questions
          </h2>
          <p className={`${guthenBloots.className} text-primary/80 text-lg mb-6`}>
            Your journey begins momentarily
          </p>
          
          <div className="flex items-center justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary/60 rounded-full"
                style={{
                  animation: "fade 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default QuestionsLoading;
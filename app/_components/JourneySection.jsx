import React from 'react';
import Image from "next/legacy/image";
import { guthenBloots, recoleta } from '@/fonts/typo';

const JourneySection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl -ml-36 -mb-36"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className={`${guthenBloots.className} text-xl text-primary/80 mb-3`}>
            Couples strengthened through understanding.
          </p>
          <h2 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800`}>
            Your Journey to Deeper Connection
          </h2>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-6 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-28 left-0 w-full h-0.5 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5"></div>

          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex-1 group relative ${
                index === 1 ? 'md:mt-32' : index === 2 ? 'md:mt-16' : ''
              }`}
            >
              {/* Connecting Arrows */}
              {index !== 0 && (
                <div className="hidden md:block absolute -left-3 top-28 transform -translate-y-full">
                  <Image
                    src={`/curvy-arrow-${index === 1 ? 'down' : 'up'}.png`}
                    alt="Arrow"
                    width={80}
                    height={80}
                    className="w-20 opacity-80"
                  />
                </div>
              )}

              {/* Step Content */}
              <div className="relative px-8 pt-12 pb-8 bg-white border-t-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
                {/* Step Number */}
                <div className="absolute -top-6 left-8">
                  <div className="bg-white border-2 border-primary/20 group-hover:border-primary text-primary px-4 py-2 transition-colors duration-300">
                    <h3 className={`${guthenBloots.className} text-xl`}>
                      {step.label}
                    </h3>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-8 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/10 blur-2xl transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image 
                      src={step.icon} 
                      alt={step.title} 
                      width={64} 
                      height={64}
                      className="relative"
                    />
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white"></div>
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-[#F8F4F2] relative z-10" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

const steps = [
  {
    label: 'Step 1',
    title: 'Take the Test (10 minutes)',
    description: 'Separately answer questions about real-life scenarios, designed by relationship experts to reveal your natural patterns.',
    icon: '/quiz.png'
  },
  {
    label: 'Step 2',
    title: 'Get Personalized Insights',
    description: 'Together, explore a detailed analysis of where your perspectives align and differ. No judgment, just understanding.',
    icon: '/insights.png'
  },
  {
    label: 'Step 3',
    title: 'Grow Together',
    description: 'Receive practical, actionable advice tailored to your unique relationship dynamic.',
    icon: '/grow.png'
  }
];

export default JourneySection;
import React from 'react';
import Image from 'next/image';
import { guthenBloots, recoleta } from '@/fonts/typo';

const QuizHeader = () => {
  return (
    <section className="relative bg-[url('/couple-bg.jpg')] bg-cover bg-center py-8 md:py-16">
      {/* Overlay for Brightness */}
      <div className="absolute inset-0 bg-black bg-opacity-50 brightness-50 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <h1
          className={`${guthenBloots.className} text-center text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-12`}
        >
          Quiz Test
        </h1>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4 md:gap-6 relative z-10 pb-14 md:pb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-2 md:p-6 border border-primary text-left md:text-center flex-1 max-w-xs md:max-w-sm ${
                index === 1 ? 'md:-translate-y-5' : 'md:translate-y-0'
              }`}
            >
              <div className="flex flex-row md:flex-col items-center justify-center justify-self-start md:justify-self-center">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={60}
                  height={60}
                  className="w-4 h-4 md:w-12 md:h-12 mx-auto md:mb-2"
                />
                <h4
                  className={`${recoleta.className} text-sm md:text-xl  md:mb-2`}
                >
                  {step.title}
                </h4>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curved SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

const steps = [
  {
    title: 'Take the Test (10 minutes)',
    description:
      'Separately answer questions about real-life scenarios, designed by relationship experts to reveal your natural patterns.',
    icon: '/quiz.png',
  },
  {
    title: 'Get Personalized Insights',
    description:
      'Together, explore a detailed analysis of where your perspectives align and differ. No judgment, just understanding.',
    icon: '/insights.png',
  },
  {
    title: 'Grow Together',
    description:
      'Receive practical, actionable advice tailored to your unique relationship dynamic.',
    icon: '/grow.png',
  },
];

export default QuizHeader;

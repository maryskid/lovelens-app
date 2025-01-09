import React from 'react';
import Image from 'next/image';
import { guthenBloots, recoleta } from '@/fonts/typo'; 

const JourneySection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="text-center max-w-7xl mx-auto">
        <p className={`${guthenBloots.className}  text-lg mb-2`}>
          Couples strengthened through understanding.
        </p>
        <h2 className={`${recoleta.className} text-2xl  md:text-3xl  lg:text-3xl antialiased font-bold mb-10`}>
          Your Journey to Deeper Connection
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-center w-full mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <Image
                  src={`/curvy-arrow-${index === 1 ? 'down' : 'up'}.png`}
                  alt="Arrow"
                  width={48}
                  height={48}
                  className="mx-2 my-4 self-center md:my-0 transform md:rotate-0 rotate-90 w-14 md:w-20"
                />
              )}
              <div className={`flex flex-col items-center bg-white shadow rounded-lg p-6 border-2 border-primary w-full md:w-80 ${index === 1 ? 'md:mt-20' : 'md:mt-0'}`}>
                <h3 className={`${guthenBloots.className} text-3xl md:text-4xl mb-4`}>
                  {step.label}
                </h3>
                <Image src={step.icon} alt={step.title} width={51} height={51} />
                <h4 className="text-lg font-semibold mt-2">{step.title}</h4>
                <p className="text-center">{step.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-[#F8F4F2]" preserveAspectRatio="none">
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

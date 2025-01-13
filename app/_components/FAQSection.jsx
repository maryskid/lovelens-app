'use client';
import React, { useState } from 'react';
import { guthenBloots, recoleta } from '@/fonts/typo';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Do we need to take the test at the same time?',
      answer:
        'No, you and your partner can take the assessment separately at your convenience. Once both of you complete it, you’ll receive your joint analysis.',
    },
    {
      question: 'How long does it take?',
      answer: 'The test typically takes around 10 minutes to complete.',
    },
    {
      question: 'Is our data private?',
      answer: 'Absolutely! Your data is secure and confidential.',
    },
    {
      question: 'Is this some kind of therapy?',
      answer: 'No, this is not therapy. It’s a guided assessment to understand relationship dynamics.',
    },
    {
      question: 'Can same-sex couples use LoveLens?',
      answer: 'Yes, LoveLens is designed for all couples.',
    },
  ];

  return (
    <section className="bg-[#F8F4F2] px-6 py-16 md:px-12 lg:px-24 rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto">
        {/* Heading Section */}
        <h2
          className={`${guthenBloots.className} text-3xl md:text-4xl leading-snug text-center`}
        >
          Got Questions? <br /> We’ve Got Answers!
        </h2>
        <p className="text-center opacity-90 text-base lg:text-lg mt-4">
          Find answers to the most common questions below. Still unsure? contact us!
        </p>

        {/* Accordion Section */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-300 bg-white rounded-lg shadow-sm border ${
                activeIndex === index ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={`${recoleta.className} font-semibold text-base md:text-lg`}>
                  {faq.question}
                </h3>
                <button
                  className={`transition-all w-10 h-10 flex items-center justify-center rounded-full ${
                    activeIndex === index
                      ? 'bg-orange-300 text-white'
                      : 'bg-white text-primary border border-primary'
                  }`}
                >
                  {activeIndex === index ? (
                    <span className="text-lg font-bold">-</span>
                  ) : (
                    <span className="text-lg font-bold">+</span>
                  )}
                </button>
              </div>
              {activeIndex === index && (
                <div className="p-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

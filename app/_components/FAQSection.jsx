'use client';
import React, { useState } from 'react';
import { guthenBloots, recoleta } from '@/fonts/typo';
import { MessageCircleQuestion, HelpCircle, ChevronRight } from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Do we need to take the test at the same time?",
      answer:
        "No, you and your partner can take the assessment separately at your convenience. Once both of you complete it, you'll receive your joint analysis.",
    },
    {
      question: "How long does it take?",
      answer: "The test typically takes around 10 minutes to complete.",
    },
    {
      question: "Is our data private?",
      answer: "Absolutely! Your data is secure and confidential.",
    },
    {
      question: "Is this some kind of therapy?",
      answer: "No, this is not therapy. It's a guided assessment to understand relationship dynamics.",
    },
    {
      question: "Can same-sex couples use LoveLens?",
      answer: "Yes, LoveLens is designed for all couples.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F8F4F2] to-white px-6 py-20 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -ml-36 -mb-36"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-primary" />
          </div>
          <h2 className={`${guthenBloots.className} text-3xl md:text-4xl mb-4`}>
            Got Questions? <br /> We've Got Answers!
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to the most common questions below. Still unsure? <button className="text-primary hover:underline font-medium">Contact us!</button>
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-primary shadow-lg shadow-primary/5' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-start justify-between p-6 cursor-pointer text-left"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                    activeIndex === index ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <h3 className={`${recoleta.className} font-semibold text-base md:text-lg text-gray-800`}>
                    {faq.question}
                  </h3>
                </div>
                <div className={`ml-4 flex-shrink-0 p-1 rounded-full transition-all duration-200 ${
                  activeIndex === index 
                    ? 'bg-primary/10 text-primary rotate-180' 
                    : 'text-gray-400'
                }`}>
                  <ChevronRight className="w-5 h-5 transform transition-transform duration-200" />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-40' : 'max-h-0'
              }`}>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <button className="text-primary hover:underline font-medium inline-flex items-center">
              <span>Get in touch</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
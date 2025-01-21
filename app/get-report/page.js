'use client';

import React, { useState, useEffect } from 'react';
import { recoleta } from '@/fonts/typo';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, KeyRound, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ code: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const prefilledCode = searchParams.get("code") || '';
    setFormData({ code: prefilledCode });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    if(!formData.code) {
      return;
    }
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const code = formData.code.trim().replace(/\s*-\s*/g, "-").toUpperCase() //Normalize the code
      const response = await fetch("/api/get-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Invalid code");
      }
  
      const { sessionId } = await response.json();
      router.push(`/report?sessionId=${sessionId}`);
    } catch (error) {
      console.error("Error validating code:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex flex-col items-center px-6 py-20 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-2xl opacity-20 blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-2xl opacity-20 blur-3xl -ml-36 -mb-36"></div>
      </div>

      <div className="text-center mb-10 relative z-10">
        <div className="inline-block p-3 bg-orange-100 rounded-xl mb-4 transform transition-transform hover:scale-105">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800 mb-3`}>
          Access Your Report
        </h1>
        <p className="text-gray-600 text-base lg:text-lg max-w-md mx-auto">
          Enter your unique code to unlock your personalized relationship insights
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl p-8 relative z-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <KeyRound className="w-4 h-4 mr-2 text-gray-400" />
                Your Access Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 
                  focus:border-primary focus:ring focus:ring-orange-100 
                  transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter your code"
              />
              {errorMessage && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3 rounded-2xl 
                hover:bg-orange-500 transform hover:-translate-y-0.5 
                transition-all duration-200 focus:outline-none
                flex items-center justify-center space-x-2 
                disabled:opacity-70 shadow-lg hover:shadow-xl"
            >
              <span>{isLoading ? 'Verifying...' : 'Access Report'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-1 text-sm text-gray-600">
            <p>Your code was provided at the end of the quiz.</p>
            <button className="inline-flex items-center text-primary hover:text-orange-600 font-medium transition-colors ml-1 hover:underline">
              <span>Need help?</span>
              <HelpCircle className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

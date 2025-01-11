'use client';

import React, { useState } from 'react';
import { recoleta } from '@/fonts/typo';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ code: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation for code
    if (formData.code === '12345') {
      router.push('/report'); // Redirect to the report page if code is valid
    } else {
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex flex-col items-center px-6 py-20">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1
          className={`${recoleta.className} text-3xl md:text-4xl font-bold text-primary`}
        >
          Get Your Report
        </h1>
        <p className="mt-2 text-gray-600 text-base lg:text-lg">
          Enter your code to access your personalized <br className="hidden md:block" /> relationship report.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label
            htmlFor="code"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Your Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-primary transition"
            placeholder="Enter your unique code"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 rounded-full hover:bg-orange-500 transition focus:outline-none"
        >
          Get Report
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Your code was provided to you at the end of the quiz. <br className="hidden md:block" /> If you’ve lost it, please contact support.
      </p>
    </div>
  );
};

export default Page;

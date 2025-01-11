'use client';

import React, { useState } from 'react';
import { recoleta } from '@/fonts/typo';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ firstName: '', email: '', gender: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to the quiz page after submission
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex flex-col items-center px-6 py-20">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1
          className={`${recoleta.className} text-3xl md:text-4xl font-bold text-primary`}
        >
          Let’s Get Started
        </h1>
        <p className="mt-2 text-gray-600 text-base lg:text-lg">
          Please provide your details to begin the quiz <br className="hidden md:block" /> and gain insights into your relationship.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-primary transition"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-primary transition"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-primary transition"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 rounded-full hover:bg-orange-500 transition focus:outline-none"
        >
          Start the Quiz
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Your mail will be used to notify you when the report is available.
      </p>
    </div>
  );
};

export default Page;

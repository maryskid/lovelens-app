"use client";

import React, { useState } from 'react';
import { recoleta } from '@/fonts/typo';
import { useRouter } from 'next/navigation';
import { UserRound, Mail, ChevronDown, HeartHandshake, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Page = () => {
  const { setUserData } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    firstName: '', 
    email: '', 
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userData = {
      ...formData,
      timestamp: new Date().toISOString() // Add a timestamp
    };

    setUserData(userData);
    
    setTimeout(() => {
      router.push('/quiz'); // backend logic
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex flex-col items-center px-6 py-10 overflow-x-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-xl opacity-20 blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-xl opacity-20 blur-3xl -ml-36 -mb-36"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-block p-3 bg-orange-100 rounded-xl mb-4 transform transition-transform hover:scale-105">
          <HeartHandshake className="w-6 h-6 text-primary" />
        </div>
        <h1 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800 mb-3`}>
          Let's Get Started
        </h1>
        <p className="text-gray-600 text-base lg:text-lg max-w-md mx-auto">
          Take the first step towards understanding your relationship dynamics better.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} 
        className="w-full max-w-md space-y-6 bg-white rounded-xl shadow-xl p-8 relative z-10 
          border border-gray-100 backdrop-blur-sm backdrop-saturate-150">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <UserRound className="w-4 h-4 mr-2 text-gray-400" />
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:border-primary focus:ring focus:ring-orange-100 
              transition-all duration-200 placeholder:text-gray-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:border-primary focus:ring focus:ring-orange-100 
              transition-all duration-200 placeholder:text-gray-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <UserRound className="w-4 h-4 mr-2 text-gray-400" />
            Gender
          </label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
                focus:border-primary focus:ring focus:ring-orange-100 
                transition-all duration-200 appearance-none bg-white"
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl 
            hover:bg-orange-500 transform hover:-translate-y-0.5 
            transition-all duration-200 focus:outline-none
            flex items-center justify-center space-x-2 
            disabled:opacity-70 shadow-lg hover:shadow-xl"
        >
          <span>{isLoading ? 'Starting...' : 'Start Your Journey'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-6 max-w-sm mx-auto">
        Your email will be used to notify you when your personalized relationship insights are ready.
      </p>
    </div>
  );
};

export default Page;
'use client';

import React, { useState } from 'react';
import { recoleta } from '@/fonts/typo';
import { useRouter } from 'next/navigation';
import CodeStatusModal from '@/app/_components/CodeStatusModal';

const Page = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(null); // Tracks 'wrong' for invalid code
  const [formData, setFormData] = useState({ firstName: '', email: '', gender: '', code: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation for the partner code
    if (formData.code === '12345') {
      router.push('/quiz'); // Redirect to the quiz page
    } else {
      setStatus('wrong'); // Open modal for wrong code
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] flex flex-col items-center px-6 py-20">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1
          className={`${recoleta.className} text-3xl md:text-4xl font-bold text-primary`}
        >
          Enter Partner’s Code
        </h1>
        <p className="mt-2 text-gray-600 text-base lg:text-lg">
          Join your partner’s quiz by entering your details <br className="hidden md:block" /> and the code they shared with you.
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

        <div>
          <label
            htmlFor="code"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Partner’s Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-primary transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 rounded-full hover:bg-orange-500 transition focus:outline-none"
        >
          Start the quiz
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Your mail will be used to notify you when the report is available.
      </p>

      {/* Modal */}
      <CodeStatusModal isOpen={modalOpen} onClose={closeModal} status={status} />
    </div>
  );
};

export default Page;

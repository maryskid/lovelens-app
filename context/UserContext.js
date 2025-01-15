"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = Cookies.get('userData');
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (userData) {
      Cookies.set('userData', JSON.stringify(userData), { 
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });
    } else {
      Cookies.remove('userData');
    }
  }, [userData]);

  // Function to get cookie data directly
  const getCookieData = () => {
    const cookieData = Cookies.get('userData');
    return cookieData ? JSON.parse(cookieData) : null;
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData,
      getCookieData
    }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
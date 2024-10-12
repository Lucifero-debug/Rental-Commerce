'use client'
// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [seller, setSeller] = useState(() => {
    if (typeof window !== 'undefined') { // Check if in the browser
      const userLocalStorage = localStorage.getItem("user");
      return userLocalStorage ? JSON.parse(userLocalStorage) : null;
    }
  });

  useEffect(() => {
    if(typeof window!=='undefined'){
      const userLocalStorage = localStorage.getItem("user");
      if (userLocalStorage) {
        setSeller(JSON.parse(userLocalStorage));
      }
    }
  }, []);


  const value = {
    seller,
    setSeller
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

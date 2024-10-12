// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [seller, setSeller] = useState(() => {
//     const userCookie = Cookies.get("user");
//     return userCookie ? JSON.parse(userCookie) : null;
//   });

//   useEffect(() => {
//     const handleCookieChange = () => {
//       const userCookie = Cookies.get("user");
//       try {
//         setSeller(userCookie ? JSON.parse(userCookie) : null);
//       } catch (error) {
//         console.error("Error parsing user cookie:", error);
//         setSeller(null); // Set to null if parsing fails
//       }
//     };

//     // Polling mechanism for cookie changes
//     const interval = setInterval(handleCookieChange, 1000);

//     return () => clearInterval(interval); // Clear the interval on unmount
//   }, []);

//   return (
//     <AuthContext.Provider value={{ seller, setSeller }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

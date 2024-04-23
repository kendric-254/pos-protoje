import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Initialize userRole state

  const login = (role) => { // Accept role parameter when logging in
    setIsLoggedIn(true);
    setUserRole(role); // Set userRole when logging in
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null); // Reset userRole when logging out
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole }}> {/* Provide userRole in context */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};


// import React, { createContext, useState, useContext } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return authContext;
// };

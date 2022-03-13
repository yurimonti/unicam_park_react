import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function useAuthUpdateContext() {
  return useContext(AuthUpdateContext);
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  function setToken() {
    setAuth(localStorage.getItem("token"));
    /* setAuth((value) => {
      // let current = value;
      value = localStorage.getItem("token");
      return value;
    }); */
    
  }

  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={setToken}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

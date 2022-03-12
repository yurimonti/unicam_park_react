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
    setAuth((value) => {
      let current = value;
      current = localStorage.getItem("token");
      return current;
    });
  }

  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={setToken}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

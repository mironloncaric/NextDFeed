import { useState, useEffect, useContext, createContext } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState();
  function createToken(token) {
    setToken(token);
  }
  const value = {
    token,
    createToken,
  };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}

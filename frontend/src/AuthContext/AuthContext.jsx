import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthStatusAPI } from "../apis/user/usersApi";
import { useQuery } from "@tanstack/react-query";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //?Request using useQuery
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryfn: checkUserAuthStatusAPI,
    queryKey: "auth-check",
  });
  //?update the authenticated user
  useEffect(() => {
    if(isSuccess){
      setIsAuthenticated(data);
    }
    },[data,isSuccess]);
  //?Updating the user auth after login
  const login = () => {
    setIsAuthenticated(true);
  };
  //?Updating the user auth after logout
  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, isError,isLoading,isSuccess,login,logout }}>
      {children}
    </AuthContext.Provider>
  )
};



//!conext hook
export const useAuth = () =>{
    return useContext(AuthContext);
}
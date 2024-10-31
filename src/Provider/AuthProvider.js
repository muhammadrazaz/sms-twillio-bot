// import axios from "axios";
import axios from "../Api/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userDetail, setUserDetail_] = useState(JSON.parse(localStorage.getItem('user')))
  const [loader, setLoader] = useState(false)

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUserDetail = (newData) => {
    setUserDetail_(newData);
  };




  useEffect(() => {
    
    if (token) {
   
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }

    if(userDetail){
      
      localStorage.setItem('user',JSON.stringify(userDetail))
    }
    else{
      localStorage.removeItem('user')
    }
  }, [token,userDetail]);










  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userDetail,
      setUserDetail,
      loader,
      setLoader,
    }),
    [token, userDetail, loader]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
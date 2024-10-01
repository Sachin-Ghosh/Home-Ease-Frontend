// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '@/utils/myCookie';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = getCookie("token");
    const storedAuthUser = getCookie("authUser");
    // console.log("Stored Token:", storedToken);
    // console.log("Stored AuthUser:", storedAuthUser);

    if (storedToken && storedAuthUser) {
      setToken(storedToken);
      setAuthUser(JSON.parse(storedAuthUser));
    }
  }, []);

  const login = (value) => {
    console.log("Login function called with:", value);
    setToken(value.token);
    setAuthUser(value.user || value); // Adjust based on your API response structure

    setCookie("authUser", JSON.stringify(value.user || value));
    setCookie("token", value.token);
    
    // console.log("After setting - Token:", value.token);
    // console.log("After setting - AuthUser:", value.user || value);
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);
    removeCookie("token");
    removeCookie("authUser");
    localStorage.clear();
    router.push("/");
  };

//   return (
//     <AuthContext.Provider value={{ token, authUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const value = {
  token,
  setToken,
  authUser,
  setAuthUser,
  login,
  logout,
  // ... other values and functions ...
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

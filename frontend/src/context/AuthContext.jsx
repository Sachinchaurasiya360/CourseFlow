//The authcontext is use to store the user data globally in frontend

import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Get current path
      const currentPath = window.location.pathname;
      
      // List of public routes that don't need authentication
      const publicRoutes = ['/', '/login', '/signup','/aboutus','/aboutcourses'];
      
      // Skip authentication check for public routes
      if (publicRoutes.includes(currentPath)) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/student/me", {
          withCredentials: true,
        });
        setUser(response?.data?.user || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

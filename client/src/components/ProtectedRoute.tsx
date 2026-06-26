import { apiClient } from "@/utils/apiClient";
import { useUserStore } from "@/store/useStore";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "STUDENT" | "ADMIN";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [checkingAuth, setCheckingAuth] = useState(!user);

  useEffect(() => {
    if (user) {
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        setUser(response.data);
      } catch {
        clearUser();
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [clearUser, setUser, user]);

  if (checkingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

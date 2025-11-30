/**
 * useAuth Hook
 * Custom React hook for managing authentication state
 */

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";

// Create Auth Context
const AuthContext = createContext({});

/**
 * Auth Provider Component
 * Wrap your app with this to provide auth state to all components
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user profile on mount
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * Fetch current user profile
   */
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message, requiresVerification: data.requiresVerification };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  /**
   * Register function
   */
  const register = async (formData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData, // FormData for file upload
      });

      const data = await res.json();

      if (res.ok) {
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message, errors: data.errors };
      }
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /**
   * Send OTP function
   */
  const sendOtp = async (email, type = "registration") => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Send OTP error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  /**
   * Verify OTP function
   */
  const verifyOtp = async (email, code) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Verify OTP error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  /**
   * Update profile function
   */
  const updateProfile = async (formData) => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message, errors: data.errors };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    sendOtp,
    verifyOtp,
    updateProfile,
    refreshUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}


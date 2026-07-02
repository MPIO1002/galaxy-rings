"use client";

import { useState } from "react";
import { saveToken, removeToken, getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

/**
 * Hook managing admin authentication state.
 * Handles login API call, token persistence, and logout.
 */
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message ?? "Đăng nhập thất bại.");
      }

      saveToken(json.token);
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
  };

  const checkAuth = (): boolean => {
    return !!getToken();
  };

  return { isLoading, error, login, logout, checkAuth };
}

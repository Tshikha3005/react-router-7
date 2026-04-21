import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  // function
  setTokens: (Access: string, refresh: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (access, refresh) => {
        set({
          accessToken: access,
          refreshToken: refresh,
        });
      },
      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

// "use client"

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  _id: string;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type GlobalState = {
  user: User | null;
  token: string;
  tokenExpiry: number | null;  // store expiry timestamp
  isLoggedIn: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string, expiry: number) => void;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      tokenExpiry: null,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: !!user }),
      setToken: (token, expiry) => set({ token, tokenExpiry: expiry }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      logout: () => set({ user: null, token: "", tokenExpiry: null, isLoggedIn: false }),
    }),
    {
      name: "global-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ persists in localStorage
    }
  )
);

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
  isLoggedIn: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: !!user }),
      setToken: (token) => set({ token }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      logout: () => set({ user: null, token: "", isLoggedIn: false }),
    }),
    {
      name: "global-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ persists in localStorage
    }
  )
);

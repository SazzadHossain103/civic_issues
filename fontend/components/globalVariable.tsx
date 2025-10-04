// "use client"

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  _id: string;
  fullname: string;
  email: string;
  // createdAt: string;
  // updatedAt: string;
  // __v: number;
};

type Admin = {
  _id: string;
  fullname: string;
  email: string;
  role: string;
}

type GlobalState = {
  user: User | null;
  token: string;
  tokenExpiry: number | null;  // store expiry timestamp
  isLoggedIn: boolean;
  
  admin: Admin | null;
  adminToken: string;
  adminTokenExpiry: number | null;  // store expiry timestamp
  isAdminLoggedIn: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string, expiry: number) => void;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;

  setAdmin: (admin: Admin | null) => void;
  setAdminToken: (adminToken: string, adminExpiry: number) => void;
  setIsAdminLoggedIn: (status: boolean) => void;
  adminlogout: () => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      tokenExpiry: null,
      isLoggedIn: false,

      admin: null,
      adminToken: "",
      adminTokenExpiry: null,
      isAdminLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: !!user }),
      setToken: (token, expiry) => set({ token, tokenExpiry: expiry }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      logout: () => set({ user: null, token: "", tokenExpiry: null, isLoggedIn: false }),
      
      setAdmin: (admin) => set({ admin, isAdminLoggedIn: !!admin }),
      setAdminToken: (adminToken, adminExpiry) => set({ adminToken, adminTokenExpiry: adminExpiry }),
      setIsAdminLoggedIn: (status) => set({ isAdminLoggedIn: status }),
      adminlogout: () => set({ admin: null, adminToken: "", adminTokenExpiry: null, isAdminLoggedIn: false }),
    }),
    {
      name: "global-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ persists in localStorage
    }
  )
);

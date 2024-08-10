import { create } from "zustand";

const useAuthStore = create(set => ({
  isAuthenticated: localStorage.getItem("accessToken"), // 초기 상태를 localStorage에 따라 설정
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus }),
}));

export default useAuthStore;

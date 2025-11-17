import { create } from "zustand";
import type { Usuario } from "@/core/types/usuario";

type AuthStore = {
  token: string | null;
  user: Usuario | null;
  isRefreshing: boolean;

  setAuth(token: string, user: Usuario): void;
  setIsRefreshing(value: boolean): void;
  removeAuth(): void;
};

export const useAuth = create<AuthStore>(
  (set) =>
    ({
      token: null,
      user: null,
      isRefreshing: false,

      setAuth(token: string, user: Usuario) {
        set({ token, user });
      },

      removeAuth() {
        set({ token: null, user: null });
      },

      setIsRefreshing(value: boolean) {
        set((state) => ({ ...state, isRefreshing: value }));
      },
    }) satisfies AuthStore,
);

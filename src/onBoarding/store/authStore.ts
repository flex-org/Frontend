import { create } from 'zustand';
import { SignedUpUser } from '../types';

interface authProps {
    email: string;
    user: SignedUpUser | null;
    token: string;
    isAuthenticated: boolean | null;
    isLoading: boolean;

    setEmail: (state: string) => void;
    setUserData: (
        user: SignedUpUser | undefined,
        token: string | undefined,
    ) => void;
    clearUserData: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<authProps>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: '',
    email: '',

    setEmail: (email: string) => set({ email }),
    setUserData: (user: SignedUpUser | undefined, token: string | undefined) =>
        set({ user, token, isAuthenticated: !!token }),
    clearUserData: () => set({ user: null, token: '', isAuthenticated: false }), 
    setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

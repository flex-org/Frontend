import { create } from 'zustand';

interface Props {
    count: number;
    increment: () => void;
    resetCount: () => void;
    domain: string;
    setDomain: (domain: string) => void;
    isYearly: boolean;
    toggleYearly: () => void;
    period: string;
    setPeriod: (key: string) => void;
}

export const useGlobalStore = create<Props>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 }),
    domain: '',
    setDomain: (domain: string) => set({ domain: domain }),
    isYearly: false,
    toggleYearly: () => set((state) => ({ isYearly: !state.isYearly })),
    period: 'monthly',
    setPeriod: (key: string) => set({ period: key }),
}));

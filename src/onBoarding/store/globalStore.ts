import { create } from 'zustand';

interface Props {
    domain: string;
    setDomain: (domain: string) => void;
    isYearly: boolean;
    toggleYearly: () => void;
    period: string;
    setPeriod: (key: string) => void;
    step: number;
    setStep: (step: number) => void;
}

export const useGlobalStore = create<Props>((set) => ({
    domain: '',
    setDomain: (domain: string) => set({ domain: domain }),
    isYearly: false,
    toggleYearly: () => set((state) => ({ isYearly: !state.isYearly })),
    period: 'monthly',
    setPeriod: (key: string) => set({ period: key }),
    step: 1,
    setStep: (step: number) => set({ step: step }),
}));

import { create } from 'zustand';

interface Props {
    count: number;
    increment: () => void;
    resetCount: () => void;
}
export const useGlobalStore = create<Props>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 }),
}));

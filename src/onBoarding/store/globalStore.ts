import { create } from 'zustand';
import { Features } from '../types';
// const [availableFeatures, setAvailableFeatures] =
//     useState<Features[]>(features);
interface Props {
    count: number;
    increment: () => void;
    resetCount: () => void;
    activeItems: Features[];
    addActiveItem: (feature: Features) => void;
    setActiveItems: (features: Features[]) => void;
}
export const useGlobalStore = create<Props>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 }),
    activeItems: [],
    addActiveItem: (feature) =>
        set((state) => ({
            activeItems: [...state.activeItems, feature],
        })),

    setActiveItems: (features) =>
        set(() => ({
            activeItems: features,
        })),
}));

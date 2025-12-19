import { create } from 'zustand';
import { Features } from '../types';

interface Props {
    count: number;
    increment: () => void;
    resetCount: () => void;

    activeItems: Features[];
    addActiveItem: (feature: Features) => void;
    setActiveItems: (features: Features[]) => void;
    removeActiveItem: (id: number) => void;

    availableFeatures: Features[];
    hasInitializedAvailableFeatures: boolean;

    initializeAvailableFeatures: (features: Features[]) => void;
    removeAvailableFeature: (id: number) => void;
    addAvailableFeature: (feature: Features) => void;
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
        set({
            activeItems: features,
        }),

    removeActiveItem: (id) =>
        set((state) => ({
            activeItems: state.activeItems.filter((item) => item.id !== id),
        })),

    availableFeatures: [],
    hasInitializedAvailableFeatures: false,

    initializeAvailableFeatures: (features) =>
        set((state) => {
            if (state.hasInitializedAvailableFeatures) return state;

            return {
                availableFeatures: features,
                hasInitializedAvailableFeatures: true,
            };
        }),

    removeAvailableFeature: (id) =>
        set((state) => ({
            availableFeatures: state.availableFeatures.filter(
                (f) => f.id !== id,
            ),
        })),

    addAvailableFeature: (feature) =>
        set((state) => ({
            availableFeatures: [...state.availableFeatures, feature],
        })),
}));

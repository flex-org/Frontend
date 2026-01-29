import { create } from 'zustand';
import { Features } from '../types';

interface Props {
    activeItems: Features[];
    availableFeatures: Features[];
    storeLanguage: string;

    initializeFromAPI: (
        allFeatures: Features[],
        selectedIds: number[],
        lng: string,
    ) => void;

    addActiveItem: (feature: Features) => void;
    setActiveItems: (features: Features[]) => void;
    removeActiveItem: (id: number) => void;
    removeAvailableFeature: (id: number) => void;
    addAvailableFeature: (feature: Features) => void;
    resetStore: () => void;
}

export const useDragDropStore = create<Props>()((set) => ({
    activeItems: [],
    availableFeatures: [],
    storeLanguage: '',
    initializeFromAPI: (allFeatures, selectedIds, lng) =>
        set(() => {
            const hasSavedData = selectedIds && selectedIds.length > 0;
            let activeIds: number[] = [];
            if (hasSavedData) {
                activeIds = selectedIds;
            } else {
                activeIds = allFeatures
                    .filter((f) => f.default)
                    .map((f) => f.id);
            }
            const active = allFeatures.filter((f) => activeIds.includes(f.id));
            const available = allFeatures
                .filter((f) => !activeIds.includes(f.id))
                .sort((a, b) => a.id - b.id);
            return {
                activeItems: active,
                availableFeatures: available,
                storeLanguage: lng,
            };
        }),
    addActiveItem: (feature) =>
        set((state) => ({
            activeItems: [...state.activeItems, feature],
        })),
    setActiveItems: (features) => set({ activeItems: features }),
    removeActiveItem: (id) =>
        set((state) => ({
            activeItems: state.activeItems.filter((item) => item.id !== id),
        })),
    removeAvailableFeature: (id) =>
        set((state) => ({
            availableFeatures: state.availableFeatures.filter(
                (f) => f.id !== id,
            ),
        })),
    addAvailableFeature: (feature) =>
        set((state) => {
            const newList = [...state.availableFeatures, feature];
            return {
                availableFeatures: newList.sort((a, b) => a.id - b.id),
            };
        }),
    resetStore: () =>
        set({
            activeItems: [],
            availableFeatures: [],
            storeLanguage: '',
        }),
}));

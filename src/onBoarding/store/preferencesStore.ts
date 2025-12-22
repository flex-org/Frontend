import { create } from 'zustand';

interface PreferencesProps {
    studentsValue: number;
    setStudentsValue: (val: number) => void;
    storageValue: number;
    setStorageValue: (val: number) => void;
    sellingSystemValues: number[];
    addSellingSystemValue: (val: number) => void;
    removeSellingSystemValue: (val: number) => void;
}
export const usePreferencesStore = create<PreferencesProps>((set) => ({
    studentsValue: 50,
    setStudentsValue: (val: number) => set({ studentsValue: val }),
    storageValue: 10,
    setStorageValue: (val: number) => set({ storageValue: val }),
    sellingSystemValues: [],
    addSellingSystemValue: (val: number) =>
        set((state) => ({
            sellingSystemValues: [...state.sellingSystemValues, val],
        })),
    removeSellingSystemValue: (val: number) =>
        set((state) => ({
            sellingSystemValues: state.sellingSystemValues.filter(
                (item) => item !== val,
            ),
        })),
}));

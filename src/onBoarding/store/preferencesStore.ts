import { create } from 'zustand';
interface PreferencesProps {
    studentsValue: number;
    setStudentsValue: (val: number) => void;
    storageValue: number;
    setStorageValue: (val: number) => void;
    sellingSystemValues: number[];
    addSellingSystemValue: (val: number) => void;
    removeSellingSystemValue: (val: number) => void;
    hasMobileApp: boolean;
    setHasMobileApp: (state: boolean) => void;
    initializeFromApi: (
        sellingSystemsIds: number[],
        mobileApp: boolean,
        capacity: number,
        storage: number,
    ) => void;
}
export const usePreferencesStore = create<PreferencesProps>()((set) => ({
    studentsValue: 50,
    setStudentsValue: (val: number) => set({ studentsValue: val }),
    storageValue: 10,
    hasMobileApp: true,
    setStorageValue: (val: number) => set({ storageValue: val }),
    sellingSystemValues: [],
    addSellingSystemValue: (val: number) =>
        set((state) => {
            if (state.sellingSystemValues.includes(val)) {
                return state;
            }
            return {
                sellingSystemValues: [...state.sellingSystemValues, val],
            };
        }),
    removeSellingSystemValue: (val: number) =>
        set((state) => ({
            sellingSystemValues: state.sellingSystemValues.filter(
                (item) => item !== val,
            ),
        })),
    setHasMobileApp: (state: boolean) => set({ hasMobileApp: state }),
    initializeFromApi: (sellingSystemsIds, mobileApp, capacity, storage) =>
        set(() => {
            return {
                sellingSystemValues: sellingSystemsIds || [],
                hasMobileApp: mobileApp,
                studentsValue: capacity,
                storageValue: storage,
            };
        }),
}));

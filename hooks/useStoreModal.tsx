import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface StoreModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useStoreModal = createWithEqualityFn<StoreModalState>()(
    devtools((set) => ({
        isOpen: false,
        open: () => {
            set({ isOpen: true });
        },
        close: () => {
            set({ isOpen: false });
        },
    })),
    Object.is
);

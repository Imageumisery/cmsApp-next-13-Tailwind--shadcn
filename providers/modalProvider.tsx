"use client";
import StoreModal from "@/components/modals/storeModal";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const storeModal = useStoreModal();
    // useEffect(() => {
    //     if (!storeModal.isOpen) {
    //         storeModal.open;
    //     }
    // }, []);

    if (!storeModal.open) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};

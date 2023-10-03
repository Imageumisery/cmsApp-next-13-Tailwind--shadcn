"use client";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect } from "react";

const Layout = () => {
    const { isOpen, open } = useStoreModal(({ isOpen, open }) => ({ isOpen, open }));

    useEffect(() => {
        if (!isOpen) {
            open();
        }
    }, [isOpen, open]);

    return <div className="p-4">root page</div>;
};

export default Layout;

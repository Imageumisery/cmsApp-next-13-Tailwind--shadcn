"use client";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect } from "react";

const Layout = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div className="p-4">
            root page
            {/* <Modal description="desc" isOpen onClose={() => {  }} title="title"/>
            <Button size="lg" variant="destructive">
                Make the world beautiful again!
            </Button> */}
        </div>
    );
};

export default Layout;

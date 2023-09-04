"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import React from "react";

type Props = {};

const layout = (props: Props) => {
    return (
        <div className="p-4">
            <Modal isOpen description="Test desc" onClose={() => {  }} title="Some title" ></Modal>
            <Button size="lg" variant="destructive">
                Make the world beautiful again!
            </Button>
        </div>
    );
};

export default layout;

import Navbar from "@/components/navbar";
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    children: React.ReactNode;
    params: { storeId: string };
};

const DashboardLayout = async ({ children, params }: Props) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismaDb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!store) {
        redirect("/");
    }

    
    return (
        <div>
            <Navbar />
            <div className="a">DashboardLayout</div>
            {children}
        </div>
    );
};

export default DashboardLayout;

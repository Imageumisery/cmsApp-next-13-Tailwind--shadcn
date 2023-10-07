import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardPageParams {
    params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageParams> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismaDb.store
        .findFirst({
            where: {
                id: params.storeId,
            },
        })
        .catch(console.log);
    return (
        <div>
            dashboard page. Active store: {store?.name}
            <div className="flex-row">created: {store?.createdAt.toLocaleDateString()}</div>
        </div>
    );
};

export default DashboardPage;

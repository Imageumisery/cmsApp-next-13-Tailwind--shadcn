import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const DashboardPage = async (props: Props) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismaDb.store
        .findFirst({
            where: {
                userId,
            },
        })
        .catch(console.log);

    console.log(store);
    // if (store) {
    //     redirect(`/${store.id}`);
    // }
    return (
        <div>
            dashboard page. Active store: {store?.name}
            <div className="flex-row">created {store?.createdAt.toLocaleDateString()}</div>
        </div>
    );
};

export default DashboardPage;

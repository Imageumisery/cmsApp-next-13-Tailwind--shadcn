import SettingsForm from "@/components/settings-form";
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
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
            <div className="flex-col">
                <div className="flex-1 space-y-4 pt-6 p-8">
                    <SettingsForm initialData={store}/>
                </div>
            </div>
        );
};

export default SettingsPage;

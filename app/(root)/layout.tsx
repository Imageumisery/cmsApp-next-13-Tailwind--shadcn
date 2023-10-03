import Navbar from "@/components/navbar";
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    children: React.ReactNode
};

const SetupLayout = async ({ children }: Props) => {
    const { userId } = auth();

    if (!userId) {
      redirect('/sign-in');
    }
  
    const store = await prismaDb.store.findFirst({
      where: {
        userId,
      }
    });
  
    if (store) {
      redirect(`/${store.id}`);
    };

    
    return (
        <div>   
            {children}
        </div>
    );
};

export default SetupLayout;

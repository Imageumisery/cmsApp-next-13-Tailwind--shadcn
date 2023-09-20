import Navbar from "@/components/navbar";
import React from "react";

type Props = {
    children: React.ReactNode;
    params: { storeId: string };
};

const Layout = ({ children, params }: Props) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;



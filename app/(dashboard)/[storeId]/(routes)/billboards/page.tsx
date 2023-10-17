import BillboardClient from "@/components/billboard-client";

type Props = {};

const BillboardsPage = (props: Props) => {
    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <BillboardClient/>
            </div>
        </div>
    );
};

export default BillboardsPage;

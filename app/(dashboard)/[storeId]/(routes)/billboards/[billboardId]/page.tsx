import BillboardForm from "@/components/billboard-form";
import prismaDb from "@/lib/prismadb";

type Props = {};

const BillboardPage = (props: Props) => {
    const billboards = prismaDb.billboard.findMany({
        where: {
            userId: "",
        },
    });
    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <BillboardForm />
            </div>
        </div>
    );
};

export default BillboardPage;

import prismaDb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import ColorClient from "./components/color-client";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
    const colors = await prismaDb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedColors: ColorColumn[] = colors.map((item) => {
        return {
            id: item.id,
            name: item.name,
            colorValue: item.colorValue,
            createdAt: item.createdAt.toLocaleDateString(),
        };
    });

    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;

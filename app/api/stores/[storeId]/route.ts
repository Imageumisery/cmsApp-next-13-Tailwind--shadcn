import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        const store = await prismaDb.store.updateMany({
            where: {
                userId,
                id: params.storeId,
            },
            data: {
                name,
            },
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const store = await prismaDb.store.deleteMany({
            where: {
                userId,
                id: params.storeId,
            },
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

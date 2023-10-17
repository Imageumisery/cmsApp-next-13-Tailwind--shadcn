import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    req: Request;
    params: {
        billboardId: string;
        storeId: string;
    };
}

export async function PATCH({ req, params }: RequestProps) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!params.billboardId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }
        const storeByUserId = prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const billboard = prismaDb.billboard.update({
            where: {
                id: params.billboardId,
            },
            data:{
                imageUrl,
                label
            }
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE({req, params}:RequestProps) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }

        const storeByUserId = prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const billboard = await prismaDb.billboard.delete({
            where: {
                id:params.billboardId
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
export async function GET({req, params}:RequestProps) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        const billboard = await prismaDb.billboard.findUnique({
            where: {
                id:params.billboardId
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

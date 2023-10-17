import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    req: Request;
    params: {
        storeId: string;
    };
}

export async function POST({ req, params }: RequestProps) {
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
        if (!params.storeId) {
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

        const billboard = await prismaDb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            },
        });
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET({ req, params }: RequestProps) {
    try {
        if (!params.storeId) {
            return new NextResponse("StoreId is required!", { status: 400 });
        }
        const billboards = await prismaDb.billboard.findMany({
            where: {
                storeId: params.storeId,
            },
        });
        return NextResponse.json(billboards);
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

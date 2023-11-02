import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    req: Request;
    params: {
        storeId: string;
        colorId: string 
    };
}

export async function PATCH( req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, colorValue } = body;
        

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!colorValue) {
            return new NextResponse("Value is required", { status: 400 });
        }
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!params.colorId) {
            return new NextResponse("StoreId is required", { status: 400 });
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

        const color = await prismaDb.color.update({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                colorValue
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }:RequestProps) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const color = await prismaDb.size.findUnique({
            where: {
                id:params.colorId
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const color = await prismaDb.color.delete({
            where: {
                id: params.colorId,
            },
        });
        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
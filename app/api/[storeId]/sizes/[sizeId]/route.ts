import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    req: Request;
    params: {
        storeId: string;
        sizeId: string 
    };
}

export async function PATCH( req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
        

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!params.sizeId) {
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

        const size = await prismaDb.size.update({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }:RequestProps) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const sizes = await prismaDb.size.findUnique({
            where: {
                id:params.sizeId
            },
        });

        return NextResponse.json(sizes);
    } catch (error) {
        console.log("[SIZE_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const size = await prismaDb.size.delete({
            where: {
                id: params.sizeId,
            },
        });
        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type RequestProps = {
    params: {
        storeId: string;
        categoryId: string;
    };
};

export async function PATCH(req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Category name is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!params.categoryId) {
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

        const category = await prismaDb.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORIES_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: RequestProps) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const categories = await prismaDb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true,
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: RequestProps) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }
        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const category = await prismaDb.category.delete({
            where: {
                id: params.categoryId,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

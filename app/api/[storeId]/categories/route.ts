import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    params: {
        storeId: string;
    };
}

export async function POST(req: Request, { params }: RequestProps) {
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
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
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

        const category = await prismaDb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORIES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function GET(
    req: Request,
    { params }: RequestProps
  ) {
    try {
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
  
      const categories = await prismaDb.category.findMany({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(categories);
    } catch (error) {
      console.log('[CATEGORIES_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

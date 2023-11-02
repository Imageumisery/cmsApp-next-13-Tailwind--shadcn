import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface RequestProps {
    req: Request;
    params: {
        storeId: string;
    };
}

export async function POST(req: Request, { params }: RequestProps) {
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
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }
        if (!colorValue) {
            return new NextResponse("Value is required", { status: 400 });
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

        const color = await prismaDb.color.create({
            data: {
                name,
                colorValue,
                storeId: params.storeId
            },
        });
        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLORS_POST]", error);
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
  
      const colors = await prismaDb.color.findMany({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(colors);
    } catch (error) {
      console.log('[COLORS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

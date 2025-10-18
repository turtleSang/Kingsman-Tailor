import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const productLink = url.searchParams.get("product") || "";
    const product = await prisma.product.findFirst({
        where: { link: productLink },
        include: { category: true, imagesUrl: true }
    })
    return NextResponse.json(product, { status: 200 });
}
import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const productLink = url.searchParams.get("product") || "";
    console.log(productLink);
    const product = await prisma.product.findMany({
        where: { link: productLink },
        include: { category: true, imagesUrl: true }
    })
    return NextResponse.json(product, { status: 200 });
}
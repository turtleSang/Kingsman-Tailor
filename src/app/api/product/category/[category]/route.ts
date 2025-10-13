import { NextResponse } from "next/server";
import { prisma } from "../../../../../../libs/prisma";
import { pageSize } from "../../../../../../libs/constance";



export async function GET(req: Request) {
    const url = new URL(req.url);
    const categoryLink = url.pathname.split("/").pop();
    const pageNumber = Number(url.searchParams.get("page")) || 1;
    const category = await prisma.category.findFirst({
        where: { link: categoryLink }
    });
    if (!category) {
        return NextResponse.json({ message: 'Danh mục không tồn tại' }, { status: 404 });
    }
    const listProduct = await prisma.product.findMany({
        where: { categoryId: category.id },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },

    });
    if (listProduct.length === 0) {
        return NextResponse.json({ message: `Sản phẩm trong danh mục ${category.name} không tồn tại` }, { status: 404 });
    }
    return NextResponse.json({ listProduct }, { status: 200 });

}
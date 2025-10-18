import { NextResponse } from "next/server";
import { prisma } from "../../../../../../libs/prisma";
import { pageSize } from "../../../../../../libs/constance";



export async function GET(req: Request) {
    const url = new URL(req.url);
    const categoryLink = url.pathname.split("/").pop();
    const page = Number(url.searchParams.get("page")) || 1;
    const category = await prisma.category.findFirst({
        where: { link: categoryLink }
    });
    if (!category) {
        return NextResponse.json({ message: 'Danh mục không tồn tại' }, { status: 404 });
    }

    const [listProduct, itemCount] = await Promise.all([
        await prisma.product.findMany({
            where: { categoryId: category.id },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        }),
        await prisma.product.count({
            where: { categoryId: category.id }
        })
    ])
    const hasMore = pageSize * page < itemCount;

    return NextResponse.json({ listProduct, hasMore }, { status: 200 });

}
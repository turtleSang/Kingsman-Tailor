import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import { CheckFileExist, NametoLink, RemoveFile, SaveFile } from "../../../../libs/helper";
import path from "path";
import { pageSize, productFolderImage } from "../../../../libs/constance";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 });
    }
    const formData = await req.formData();
    const name = formData.get('name')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const listImg = formData.getAll('images') as File[] || [];
    const thumbnailFile = formData.get('thumbnail') as File | null;
    let thumbnail = "";

    // Check exits
    const exitsProduct = await prisma.product.findUnique({
        where: { name: name }
    })

    if (exitsProduct) {
        return NextResponse.json({ message: 'Tên sản phẩm đã tồn tại' }, { status: 400 });
    }

    //Check Category
    const category = await prisma.category.findFirst({
        where: { id: Number(categoryId) }
    })

    if (category == null) {
        return NextResponse.json({ message: 'Không tìm thấy danh mục hàng' }, { status: 404 });
    }
    //Check Thumbnail
    if (thumbnailFile) {
        const fileName = `${NametoLink(name)}-thumbnail-${Date.now()}.${thumbnailFile.name.split('.').pop()}`;
        thumbnail = `${productFolderImage}/${fileName}`;
        await SaveFile(thumbnailFile, productFolderImage, fileName)
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                description,
                category: { connect: { id: Number(categoryId) } },
                thumbnail: thumbnail,
                link: NametoLink(name)
            }
        })

        if (listImg.length > 0) {
            for (const img of listImg) {
                const fileName = `${product.link}-${Date.now()}.${img.name.split('.').pop()}`;
                const imgUrl = `${productFolderImage}/${fileName}`;
                await prisma.imageUrl.create({
                    data: {
                        url: imgUrl,
                        product: { connect: { id: product.id } }
                    }
                })
                await SaveFile(img, productFolderImage, fileName)
            }
        }
        return NextResponse.json({ message: `Tạo thành công sản phẩm ${product.name}` }, { status: 201 });
    } catch (error) {

        return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);

    const page = Number(url.searchParams.get("page")) || 1;

    const [listProduct, itemCount] = await Promise.all([
        await prisma.product.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        }),
        await prisma.product.count()
    ])
    const hasMore = pageSize * page < itemCount;

    return NextResponse.json({ listProduct, hasMore });
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id")) || 0;
    const product = await prisma.product.findFirst({
        where: { id: id },
        include: { imagesUrl: true }
    })
    if (!product) {
        return NextResponse.json({ message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    try {
        //delete thumbnail
        if (product.thumbnail) {
            const thumbnailPath = path.join(process.cwd(), "public", product.thumbnail);
            if (await CheckFileExist(thumbnailPath)) {
                await RemoveFile(thumbnailPath)
            }
        }
        //delete Images
        if (product.imagesUrl.length > 0) {
            for (const img of product.imagesUrl) {
                const imgPath = path.join(process.cwd(), "public", img.url);
                if (await CheckFileExist(imgPath)) {
                    await RemoveFile(imgPath);
                }
            }
            await prisma.imageUrl.deleteMany({
                where: {
                    productId: {
                        equals: product.id
                    }
                }
            })
        }
        await prisma.product.delete({
            where: {
                id: product.id
            }
        })
        return NextResponse.json({ message: `Xóa thành công sản phẩm ${product.name}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi xóa ảnh sản phẩm' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const formData = await req.formData();
    const id = formData.get("id")?.toString() || "0";
    const name = formData.get('name')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const listImg = formData.getAll('images') as File[] || [];
    const thumbnailFile = formData.get('thumbnail') as File | null;
    let thumbnail = "";

    const productOld = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: { imagesUrl: true }
    })

    if (!productOld) {
        return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const productNameSearch = await prisma.product.findFirst({
        where: {
            name: name
        }
    });

    if (productNameSearch && productNameSearch.id != productOld.id) {
        return NextResponse.json({ message: "Tên sản phẩm đã tổn tại", }, { status: 500 });
    }

    const category = await prisma.category.findFirst({
        where: {
            id: Number(categoryId)
        }
    });


    if (category === null) {
        return NextResponse.json({ message: "Danh mục không tồn tại" }, { status: 404 })
    }

    if (thumbnailFile) {
        if (productOld.thumbnail) {
            const oldThumbnailPath = path.join(process.cwd(), "public", productOld.thumbnail);
            if (await CheckFileExist(oldThumbnailPath)) {
                await RemoveFile(oldThumbnailPath)
            }
        }
        const fileName = `${NametoLink(name)}-thumbnail-${Date.now()}.${thumbnailFile.name.split('.').pop()}`;
        thumbnail = `${productFolderImage}/${fileName}`
        await SaveFile(thumbnailFile, productFolderImage, fileName)
    }

    const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            thumbnail: thumbnail ? thumbnail : productOld.thumbnail,
            category: { connect: { id: Number(categoryId) } },
            price: Number(price),
            description,
            link: name ? NametoLink(name) : productOld.link,
            name: name ? name : productOld.name,
        }
    })

    if (listImg.length > 0) {
        //Delete Old Image
        if (productOld.imagesUrl.length > 0) {
            for (const image of productOld.imagesUrl) {
                const filepath = path.join(process.cwd(), "public", image.url);
                if (await CheckFileExist(filepath)) {
                    await RemoveFile(filepath)
                }

            }
            await prisma.imageUrl.deleteMany({
                where: {
                    productId: {
                        equals: productOld.id
                    }
                }
            })
        }
        //Save new Image
        for (const image of listImg) {
            const fileName = `${product.link}-${Date.now()}.${image.name.split('.').pop()}`;

            await SaveFile(image, productFolderImage, fileName)

            const url = `${productFolderImage}/${fileName}`;
            await prisma.imageUrl.create({
                data: {
                    url: url,
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                }
            });

        }
    }
    return NextResponse.json({ message: `Cập nhật thành công sản phẩm ` }, { status: 200 });

}
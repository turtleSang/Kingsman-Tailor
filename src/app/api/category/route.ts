import { NextResponse } from "next/server";
import { prisma } from "@/../libs/prisma";
import { CheckFileExist, NametoLink, RemoveFile, SaveFile } from "../../../../libs/helper";
import path from "path";
import { categoryFolderImage } from "../../../../libs/constance";
import { getServerSession } from "next-auth";


export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 });
    }

    const formData = await req.formData();
    const cateName = formData.get("name")?.toString() || "";
    const cateImg = formData.get("image") as File | null;
    let imgUrl = "";
    let fileName = "";

    if (!cateName) {
        return NextResponse.json({ message: "Thiếu tên mục" }, { status: 400 });
    }
    const cateLink = NametoLink(cateName);

    if (cateImg) {
        fileName = `${cateLink}-${Date.now()}.${cateImg.name.split('.').pop()}`;
        imgUrl = `api/image/${categoryFolderImage}/${fileName}`;
    }

    try {
        const newCate = await prisma.category.create({
            data: { name: cateName, link: cateLink, urlImg: imgUrl },
        });
        if (cateImg) {
            await SaveFile(cateImg, categoryFolderImage, fileName)
        }
        return NextResponse.json({ message: `Tạo thành công mục ${newCate.name}` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Trùng tên danh mục / Lỗi Hệ Thống" }, { status: 500 });
    }

}

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" },
        });
        return NextResponse.json(categories);
    }
    const category = await prisma.category.findFirst({ where: { id: Number(id) } })
    if (category) {
        return NextResponse.json(category, { status: 200 })
    } else {
        return NextResponse.json({ message: 'Không tìm thấy danh mục' }, { status: 404 })
    }


}

export async function PUT(req: Request,) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 });
    }
    const formData = await req.formData();
    const id = parseInt(formData.get("id")?.toString() || "0");
    const name = formData.get("name")?.toString() || "";
    const cateImg = formData.get("image") as File | null;
    const category = await prisma.category.findUnique({
        where: { id: id }
    })
    //Check category
    if (!category) {
        return NextResponse.json({ message: "Category Không tìm thấy" }, { status: 404 });
    }
    const categorySearchByName = await prisma.category.findUnique({
        where: { name: name }
    })

    if (categorySearchByName && categorySearchByName.id != category.id) {
        return NextResponse.json({ message: "Trùng tên danh mục" }, { status: 500 });
    }

    const newLink = NametoLink(name);
    let newImgLink = "";

    try {
        if (cateImg) {
            //Delete old image
            if (category.urlImg) {
                if (await CheckFileExist(category.urlImg)) {
                    await RemoveFile(category.urlImg)
                }
            }
            //Save new Image
            const fileName = `${newLink}-${Date.now()}.${cateImg.name.split('.').pop()}`;
            await SaveFile(cateImg, categoryFolderImage, fileName)
            newImgLink = `api/image/${categoryFolderImage}/${fileName}`;
        }
        const cateUpdate = await prisma.category.update({
            where: { id: id },
            data: { name: name, link: newLink, urlImg: newImgLink ? newImgLink : category.urlImg }
        })

        return NextResponse.json({ message: `Cập nhật thành công mục ${cateUpdate.name}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 });
    }
    const url = new URL(req.url)
    const id = Number(url.searchParams.get('id')) || 0;
    const category = await prisma.category.findFirst({ where: { id }, include: { products: true } })
    if (!category) {
        return NextResponse.json({ message: "Không tìm thấy cateogory" }, { status: 404 });

    }
    if (category.products.length > 0) {
        return NextResponse.json({ message: "Không thể xóa vì còn sản phẩm trong danh mục" }, { status: 400 });
    }

    try {
        const categoryDeleted = await prisma.category.delete({ where: { id } })


        if (categoryDeleted.urlImg) {
            if (await CheckFileExist(categoryDeleted.urlImg)) {
                console.log(categoryDeleted.urlImg);
                await RemoveFile(categoryDeleted.urlImg)
            }
        }
        return NextResponse.json({ message: `Xóa thành công category ${category.name}` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Lỗi hệ thống` }, { status: 500 })

    }
}
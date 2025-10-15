import { NextResponse } from "next/server";
import { prisma } from "@/../libs/prisma";
import { CheckFileExist, NametoLink, RemoveAndCheckFile, RemoveFile, SaveFile } from "../../../../libs/helper";
import path from "path";
import { categoryFolderImage } from "../../../../libs/constance";


export async function POST(req: Request) {
    const formData = await req.formData();
    const cateName = formData.get("name")?.toString() || "";
    const cateImg = formData.get("image") as File | null;
    let imgUrl = "";
    let fileName = "";

    if (!cateName) {
        return NextResponse.json({ messenger: "Thiếu tên mục" }, { status: 400 });
    }
    const cateLink = NametoLink(cateName);

    if (cateImg) {
        fileName = `${cateLink}-${Date.now()}.${cateImg.name.split('.').pop()}`;
        imgUrl = `${categoryFolderImage}/${fileName}`;
    }


    try {
        const newCate = await prisma.category.create({
            data: { name: cateName, link: cateLink, urlImg: imgUrl },
        });
        if (cateImg) {
            await SaveFile(cateImg, categoryFolderImage, fileName)
        }
        return NextResponse.json({ messenger: `Tạo thành công mục ${newCate.name}` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ messenger: "Trùng tên" }, { status: 500 });
    }

}

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
    });
    return NextResponse.json(categories);
}

export async function PUT(req: Request,) {
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
                const oldCategoryImagePath = path.join(process.cwd(), "public", category.urlImg)
                if (await CheckFileExist(oldCategoryImagePath)) {
                    await RemoveFile(oldCategoryImagePath)
                }
            }
            //Save new Image
            const fileName = `${newLink}-${Date.now()}.${cateImg.name.split('.').pop()}`;
            await SaveFile(cateImg, categoryFolderImage, fileName)
            newImgLink = `${categoryFolderImage}/${fileName}`;
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
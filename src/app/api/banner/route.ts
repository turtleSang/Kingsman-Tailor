import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import path from "path";
import { bannerImage } from "../../../../libs/constance";
import { CheckFileExist, RemoveFile, SaveFile } from "../../../../libs/helper";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 })
    }
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const description = formData.get("description")?.toString() || "";
    const link = formData.get("link")?.toString() || "";

    if (!image || image.size === 0 || !image.name) {
        return NextResponse.json({ message: "Yêu cầu hình ảnh để tạo banner" }, { status: 400 })
    }

    try {
        const fileName = `${Date.now()}${image.name}`;
        await SaveFile(image, bannerImage, fileName);

        const imageUrl = `${bannerImage}/${fileName}`;

        const banner = await prisma.banner.create({
            data: {
                imageUrl,
                description,
                link
            }
        });
        return NextResponse.json({ message: `Tạo thành công ${banner.id}` }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
    }


}

export async function PUT(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 })
    }
    const formData = await req.formData();
    const image = formData.get("image") as File || null;
    const description = formData.get("description")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const id = formData.get("id")?.toString() || "";

    if (!image || image.size === 0 || !image.name) {
        return NextResponse.json({ message: "Yêu cầu hình ảnh để update banner" }, { status: 400 })
    }
    const banner = await prisma.banner.findFirst({
        where: {
            id: Number(id)
        }
    });

    if (!banner) {
        return NextResponse.json({ message: "Không tìm thấy banner" }, { status: 404 })
    }

    try {
        const oldImagePath = path.join(process.cwd(), "public", banner.imageUrl)
        if (await CheckFileExist(oldImagePath)) {
            await RemoveFile(oldImagePath)
        }
        const fileName = `${Date.now()}${image.name}`;
        await SaveFile(image, bannerImage, fileName);
        const imageUrl = `${bannerImage}/${fileName}`;
        const bannerUpdated = await prisma.banner.update({
            where: {
                id: Number(id)
            },
            data: {
                imageUrl,
                description: description ? description : banner.description,
                link: link ? link : banner.link
            }
        })
        return NextResponse.json({ message: `Banner ${bannerUpdated.id} đã được update ` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Lỗi hệ thống` }, { status: 500 });

    }

}

export async function GET() {
    const listBanner = await prisma.banner.findMany();
    if (listBanner.length > 0) {
        return NextResponse.json(listBanner, { status: 200 })
    } else {
        return NextResponse.json({ message: "Không tìm thấy banner" }, { status: 404 })
    }

}

export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: 'Không có quyền truy cập' }, { status: 403 });
    }
    const url = new URL(req.url)
    const id = Number(url.searchParams.get('id')) || 0;
    if (id === 0) {
        return NextResponse.json({ message: 'Vui lòng nhập thêm Id' }, { status: 400 });
    }
    try {
        const banner = await prisma.banner.delete({ where: { id } })
        const pathImage = path.join(process.cwd(), "public", banner.imageUrl)
        if (await CheckFileExist(pathImage)) {
            await RemoveFile(pathImage)
            console.log('remove', pathImage)
        }
        return NextResponse.json({ message: `Đã xóa banner ${banner.id}` })
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi hệ thống' }, { status: 500 });

    }


}


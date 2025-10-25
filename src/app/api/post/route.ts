import path from "path";
import { pageSize, postImage } from "../../../../libs/constance";
import { CheckFileExist, NametoLink, RemoveFile, SaveFile } from "../../../../libs/helper";
import { prisma } from "../../../../libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formdata = await req.formData();
    const image = formdata.get("image") as File | null;
    const title = formdata.get("title") as string | null;
    const content = formdata.get("content") as string | null;
    const excerpt = formdata.get("excerpt") as string | null;

    if (!image || !title || !content || !excerpt || image.size === 0) {
        return new NextResponse(
            JSON.stringify({ message: "Yêu cầu nhập đầy đủ thông tin" }),
            { status: 400 }
        );
    }
    try {
        const link = NametoLink(title);
        const fileName = `${link}-${Date.now()}.${image.name.split(".").pop()}`;
        await SaveFile(image, postImage, fileName);
        const post = await prisma.post.create({
            data: {
                content,
                title,
                link,
                excerpt,
                thumnail: `${postImage}/${fileName}`
            }
        });
        await SaveFile(image, postImage, fileName);
        return new NextResponse(
            JSON.stringify({ message: `Tạo bài viết ${post.title} thành công` }),
            { status: 201 }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Lỗi hệ thống", error }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    const formdata = await req.formData();
    const id = formdata.get("id") as string | null;
    const image = formdata.get("image") as File | null;
    const title = formdata.get("title") as string | null;
    const content = formdata.get("content") as string | null;
    const excerpt = formdata.get("excerpt") as string | null;

    if (!image || !title || !content || !excerpt || image.size === 0) {
        return new NextResponse(
            JSON.stringify({ message: "Yêu cầu nhập đầy đủ thông tin" }),
            { status: 400 }
        );
    }

    const oldPost = await prisma.post.findFirst({ where: { id: Number(id) } });
    if (!oldPost) {
        return new NextResponse(
            JSON.stringify({ message: "Không tìm thấy bài viết" }),
            { status: 404 }
        );
    }
    if (oldPost.thumnail) {
        const oldPathThumbnail = path.join(process.cwd(), "public", oldPost.thumnail);
        if (await CheckFileExist(oldPathThumbnail)) {
            await RemoveFile(oldPathThumbnail);
        }
    }

    try {
        const link = NametoLink(title);
        const fileName = `${link}-${Date.now()}.${image.name.split(".").pop()}`;
        await prisma.post.update({
            where: { id: oldPost.id },
            data: {
                content,
                link,
                title,
                excerpt,
                thumnail: `${postImage}/${fileName}`
            }
        });
        await SaveFile(image, postImage, fileName);
        return new NextResponse(
            JSON.stringify({ message: `Cập nhật bài viết ${title} thành công` }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Lỗi hệ thống" }),
            { status: 500 }
        );
    }

}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('id')?.toString() || '0');
    if (!id) {
        return NextResponse.json({ message: 'Yêu cầu ID để xóa' }, { status: 400 });
    }
    try {
        const deletePost = await prisma.post.delete({ where: { id } });
        if (deletePost.thumnail) {
            const oldPathThumbnail = path.join(process.cwd(), "public", deletePost.thumnail);
            if (await CheckFileExist(oldPathThumbnail)) {
                await RemoveFile(oldPathThumbnail);
            }
        }
        return NextResponse.json({ message: `Xóa bài viết ${deletePost.title} thành công` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi hệ thống' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || '0');
    if (page > 0) {
        const [listPost, total] = await Promise.all([
            prisma.post.findMany({
                skip: (Number(page) - 1) * pageSize,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.post.count()
        ])
        const hasMore = page * pageSize < total;
        return NextResponse.json({ listPost, hasMore }, { status: 200 });
    }
    const link = url.searchParams.get("link") || '';
    if (link) {
        const post = await prisma.post.findFirst({ where: { link: link } });
        return NextResponse.json(post, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Yêu cầu trang hoặc link bài viết' }, { status: 400 });
    }
}
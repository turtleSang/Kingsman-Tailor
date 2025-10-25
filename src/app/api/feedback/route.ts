import { NextResponse } from "next/server";
import path from "path";
import { feedbackImage, pageSize } from "../../../../libs/constance";
import { CheckFileExist, NametoLink, RemoveFile, SaveFile } from "../../../../libs/helper";
import { prisma } from "../../../../libs/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Không có quyền" }, { status: 403 });
    }

    const formdata = await request.formData();
    const imageFile = formdata.get("image") as File || null;
    const customerName = formdata.get("customerName")?.toString() || "";
    const feedback = formdata.get("feedback")?.toString() || "";

    if (!imageFile || imageFile.size === 0 || !customerName || !feedback) {
        return NextResponse.json({ message: "Không có trường dữ liệu" }, { status: 400 });
    }

    try {
        const fileName = `${NametoLink(customerName)}-${Date.now()}.${imageFile.name.split(".").pop()}`;
        await SaveFile(imageFile, feedbackImage, fileName);
        const image = `${feedbackImage}/${fileName}`;

        const newFeedBack = await prisma.feedBack.create({
            data: {
                customerName,
                feedback,
                image
            }
        });

        return NextResponse.json({ message: `Tạo thành công feedback của khách hàng ${newFeedBack.customerName}` }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Lỗi hệ thống", error }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);

    const id = url.searchParams.get('id')
    if (id) {
        try {
            const feedback = await prisma.feedBack.findFirst({
                where: {
                    id: Number(id)
                }
            })

            return NextResponse.json(feedback, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: "Không tìm thấy feedback " }, { status: 404 })

        }

    }

    const page = Number(url.searchParams.get("page")?.toString()) || 1;

    const [listFeedback, feedbackCount] = await Promise.all([
        await prisma.feedBack.findMany({
            take: pageSize,
            skip: (page - 1) * pageSize,
            orderBy: { id: 'desc' }
        }),
        await prisma.feedBack.count()
    ])

    const hasMore = feedbackCount > pageSize * page

    return NextResponse.json({ listFeedback, hasMore }, { status: 200 })

}

export async function PUT(req: Request) {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File || null;
    const customerName = formData.get("customerName")?.toString() || "";
    const feedback = formData.get("feedback")?.toString() || "";
    const id = formData.get("id")?.toString() || "";
    if (!imageFile || !customerName || !feedback || !id) {
        return NextResponse.json({ message: "Không có trường dữ liệu" }, { status: 400 });
    }

    const oldFeedback = await prisma.feedBack.findFirst({
        where: {
            id: Number(id)
        }
    })

    if (!oldFeedback) {
        return NextResponse.json({ message: "Không tìm thấy feedback " }, { status: 404 })
    }

    if (oldFeedback.image) {
        const pathOldImage = path.join(process.cwd(), 'public', oldFeedback.image);
        if (await CheckFileExist(pathOldImage)) {
            await RemoveFile(pathOldImage)
        }
    }
    try {
        const fileName = `${NametoLink(customerName)}-${Date.now()}.${imageFile.name.split(".").pop()}`;
        await SaveFile(imageFile, feedbackImage, fileName);
        const image = `${feedbackImage}/${fileName}`;

        const feedBackUpdated = await prisma.feedBack.update({
            where: {
                id: oldFeedback.id
            }, data: { customerName, feedback, image }
        })
        return NextResponse.json({ message: `Cập nhật thành công feedback của khách hàng ${feedBackUpdated.customerName}` }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "Lỗi hệ thống", error }, { status: 500 })

    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('id')?.toString() || '0');
    if (!id) {
        return NextResponse.json({ message: 'Yêu cầu ID để xóa' }, { status: 400 });
    }
    try {
        const feedbackDeleted = await prisma.feedBack.delete({ where: { id } });
        if (feedbackDeleted.image) {
            const pathOldImage = path.join(process.cwd(), 'public', feedbackDeleted.image);
            if (await CheckFileExist(pathOldImage)) {
                await RemoveFile(pathOldImage)
            }
        }
        return NextResponse.json({ message: `Đã xóa thành công feed back của khách hàng ${feedbackDeleted.customerName}` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Lỗi hệ thống` }, { status: 500 })
    }
}
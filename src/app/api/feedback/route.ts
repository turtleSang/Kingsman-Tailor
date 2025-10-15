import { NextResponse } from "next/server";
import path from "path";
import { feedbackImage, pageSize } from "../../../../libs/constance";
import { NametoLink, SaveFile } from "../../../../libs/helper";
import { prisma } from "../../../../libs/prisma";

export async function POST(request: Request) {
    const formdata = await request.formData();
    const imageFile = formdata.get("image") as File || null;
    const customerName = formdata.get("customerName")?.toString() || "";
    const feedback = formdata.get("feedback")?.toString() || "";

    if (!imageFile || !customerName || !feedback) {
        return NextResponse.json({ message: "Không có trường dữ liệu" }, { status: 400 });
    }

    try {
        const fileName = `${NametoLink(customerName)}-${Date.now()}.${imageFile.name.split(".").pop()}`;
        await SaveFile(imageFile, feedbackImage, fileName);
        const image = `${feedbackImage}/${fileName})`;

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
    const page = url.searchParams.get("page")?.toString() || "1";

    const listFeedBack = await prisma.feedBack.findMany({
        skip: (Number(page) - 1) * pageSize
    })

    if (listFeedBack.length > 0) {
        return NextResponse.json(listFeedBack, { status: 200 })
    } else {
        return NextResponse.json({ message: "Không tìm thấy danh mục nào" }, { status: 404 })
    }

}
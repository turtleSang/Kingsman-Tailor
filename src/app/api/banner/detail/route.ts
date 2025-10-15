import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id")?.toString()) || 0;
    if (id == 0) {
        return NextResponse.json({ message: "Yêu cầu không hợp lệ" }, { status: 400 })
    }
    const banner = await prisma.banner.findFirst({
        where: { id }
    })
    if (banner) {
        return NextResponse.json(banner, { status: 200 })
    } else {
        return NextResponse.json({ message: "Không tìm thấy" }, { status: 404 })
    }
}
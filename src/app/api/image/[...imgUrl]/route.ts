import { NextResponse } from "next/server";
import path from "path";
import { CheckFileExist, ReadFile } from "../../../../../libs/helper";
import fs from "fs";

export async function GET(req: Request) {

    try {
        if (await CheckFileExist(req.url)) {
            const [folder, fileName] = req.url.split('/').slice(-2);
            const filePath = path.join(process.cwd(), 'upload', folder, fileName)
            const bufferArray = await fs.promises.readFile(filePath);
            const file = Buffer.from(bufferArray)
            const fileType = filePath.endsWith(".jpg")
                ? "image/jpeg"
                : filePath.endsWith(".png")
                    ? "image/png"
                    : "application/octet-stream";
            return new NextResponse(file, { status: 200, headers: { 'content-type': fileType } })
        } else {
            return NextResponse.json({ message: 'Không tìm thấy file' }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi Hệ Thống' }, { status: 500 })
    }


}
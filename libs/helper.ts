import fs from "fs";
import path from "path";


const publicDir = path.join(process.cwd(), "upload");

export const NametoLink = (name: string) => {
    return name.normalize('NFD')                     // Tách ký tự gốc và dấu
        .replace(/[\u0300-\u036f]/g, '')      // Xóa các dấu thanh
        .replace(/đ/g, 'd')                   // Thay đ -> d
        .replace(/Đ/g, 'd')                   // Thay Đ -> d
        .replace(/\s+/g, '-')                 // Thay khoảng trắng bằng dấu -  
        .replace(/[^a-zA-Z0-9-]/g, '')        // ❗ Xóa ký tự đặc biệt
        .replace(/-+/g, '-')                  // Gộp nhiều dấu - liên tiếp thành 1
        .replace(/^-|-$/g, '')                // Xóa dấu - ở đầu hoặc cuối (nếu có)     
        .toLowerCase();                       // Chuyển về chữ thườ
}

export const CheckFileExist = async (urlLink: string): Promise<boolean> => {
    try {
        const [folder, fileName] = urlLink.split('/').slice(-2);
        const filePath = path.join(publicDir, folder, fileName)
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

export const RemoveFile = async (urlLink: string): Promise<void> => {
    try {
        const [folder, fileName] = urlLink.split('/').slice(-2);
        const filePath = path.join(publicDir, folder, fileName)
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Error deleting file: ${urlLink}`, error);
    }
}


export const SaveFile = async (file: File, folderName: string, filename: string,) => {
    try {
        const dirPath = path.join(publicDir, folderName);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const byte = await file.arrayBuffer();
        const buffer = Buffer.from(byte);
        await fs.promises.writeFile(path.join(dirPath, filename), buffer);
    } catch (error) {
        console.error("Can not save file", error);
    }
}

export const ReadFile = async (filePath: string) => {
    const bufferArray = await fs.promises.readFile(filePath);
    const fileType = filePath.endsWith(".jpg")
        ? "image/jpeg"
        : filePath.endsWith(".png")
            ? "image/png"
            : "application/octet-stream";

    const file = Buffer.from(bufferArray)
    return { file, fileType }
}


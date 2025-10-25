import fs from "fs";
import path from "path";


const publicDir = path.join(process.cwd(), "public");

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

export const CheckFileExist = async (filePath: string): Promise<boolean> => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

export const RemoveFile = async (filePath: string): Promise<void> => {
    try {
        await fs.promises.unlink(filePath);

    } catch (error) {
        console.error(`Error deleting file: ${filePath}`, error);
    }
}

export const RemoveAndCheckFile = async (link: string): Promise<void> => {
    const filePath = path.join(publicDir, link)
    console.log(filePath)
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



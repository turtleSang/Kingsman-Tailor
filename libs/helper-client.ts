
export function formatCurrency(value: number, locale = "en-US", currency = "VND"): string {
    return new Intl.NumberFormat(locale).format(value);
}

export function parseCurrency(value: string): number {

    // Xóa tất cả ký tự không phải số hoặc dấu chấm
    const numeric = value.replace(/[^\d.-]/g, "");

    return parseInt(numeric);
}

export const truncateWords = (text: string, numWords: number): string => {
    // 1. Kiểm tra nếu input không hợp lệ
    if (!text || typeof text !== 'string') {
        return '';
    }

    // 2. Tách chuỗi thành mảng các từ
    const words = text.trim().split(/\s+/);

    // 3. Nếu chuỗi ngắn hơn hoặc bằng 20 từ, trả về nguyên bản
    if (words.length <= numWords) {
        return text;
    }

    // 4. Ngắt mảng từ ở vị trí 20 và nối lại, thêm "..."
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ') + '...';
};

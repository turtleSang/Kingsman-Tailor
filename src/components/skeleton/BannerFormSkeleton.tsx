import React from "react";

const BannerFormSkeleton = () => {
  // Dùng Tailwind CSS utility classes cho hiệu ứng shimmer và bố cục
  return (
    // relative là cần thiết nếu bạn muốn overlay loading/notification bên ngoài form
    <div className="relative p-4 animate-pulse space-y-4">
      {/* Mô phỏng:
        1. InputText (ID) - Dòng đầu tiên
      */}
      <div className="space-y-2">
        {/* Label Placeholder */}
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
        {/* Input Field Placeholder (ID disabled) */}
        <div className="w-full h-10 bg-gray-400 rounded-lg"></div>
      </div>

      {/* Mô phỏng:
        2. InputArea (Mô tả)
      */}
      <div className="space-y-2">
        {/* Label Placeholder */}
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
        {/* Input Area Placeholder (thường cao hơn Input Text) */}
        <div className="w-full h-24 bg-gray-400 rounded-lg"></div>
      </div>

      {/* Mô phỏng:
        3. InputText (Link)
      */}
      <div className="space-y-2">
        {/* Label Placeholder */}
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
        {/* Input Field Placeholder */}
        <div className="w-full h-10 bg-gray-400 rounded-lg"></div>
      </div>

      {/* Mô phỏng:
        4. InputImageSingle (Ảnh)
        Thường là một khu vực hình ảnh lớn và nút tải lên
      */}
      <div className="space-y-2 pt-2">
        {/* Label/Header Placeholder */}
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        {/* Image Display Area Placeholder (Aspect Ratio) */}
        <div className="w-full h-40 bg-gray-400 rounded-lg"></div>
        {/* Nút/Chức năng tải lên ảnh Placeholder */}
        <div className="w-32 h-8 bg-gray-300 rounded-lg mx-auto"></div>
      </div>

      {/* Mô phỏng:
        5. Vùng Nút bấm (Cập nhật và Xóa)
      */}
      <div className="p-3 flex flex-row justify-around pt-4">
        {/* Nút Cập nhật Placeholder */}
        <div className="w-28 h-10 bg-blue-500 rounded-lg"></div>
        {/* Nút Xóa Banner Placeholder */}
        <div className="w-28 h-10 bg-red-500 rounded-lg"></div>
      </div>
    </div>
  );
};

export default BannerFormSkeleton;

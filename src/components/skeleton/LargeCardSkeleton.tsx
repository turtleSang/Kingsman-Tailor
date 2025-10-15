import React from "react";

const LargeCardSkeleton = () => {
  return (
    <div
      className="flex flex-row justify-start items-center bg-secondary p-3 rounded-lg animate-pulse" // Thêm animate-pulse
    >
      {/* Skeleton cho Ảnh (Image) */}
      <div className="aspect-video relative w-1/3">
        {/* Placeholder cho ảnh: hình chữ nhật xám */}
        <div className="absolute inset-0 bg-gray-600 rounded-lg"></div>
      </div>

      {/* Skeleton cho Nội dung (Content) */}
      <div className="pl-5 w-2/3">
        {/* Dòng 1: ID */}
        <div className="flex flex-row mb-2">
          <div className="w-6/12 h-4 bg-gray-600 rounded mt-1"></div>
        </div>

        {/* Dòng 2: Mô tả (Description) */}
        <div className="flex flex-row mb-2">
          <div className="w-8/12 h-4 bg-gray-600 rounded mt-1"></div>
        </div>

        {/* Dòng 3: Link */}
        <div className="flex flex-row mb-2">
          <div className="w-7/12 h-4 bg-gray-600 rounded mt-1"></div>
        </div>

        {/* Skeleton cho Nút (Button) */}
        <div className="text-center mt-4">
          {/* Placeholder cho nút Chỉnh sửa: hình chữ nhật xám lớn hơn, có bo góc */}
          <div className="inline-block w-4/12 h-10 bg-gray-600 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LargeCardSkeleton;

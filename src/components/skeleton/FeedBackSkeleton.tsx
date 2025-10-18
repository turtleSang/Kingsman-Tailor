"use client";

export default function FeedbackCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden"
        >
          {/* Ảnh */}
          <div className="w-full aspect-[16/9] bg-gray-800"></div>

          {/* Nội dung */}
          <div className="p-4">
            {/* Tên khách hàng */}
            <div className="h-5 w-1/2 bg-gray-700 rounded mb-3"></div>

            {/* Đoạn feedback */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              <div className="h-3 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

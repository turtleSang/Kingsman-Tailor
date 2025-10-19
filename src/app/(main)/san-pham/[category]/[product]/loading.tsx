"use client";

import { motion } from "framer-motion";

export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row gap-8 p-6 animate-pulse max-w-full">
      {/* Hình ảnh chính */}
      <div className="relative">
        <div className="w-full aspect-square bg-gray-800 rounded-2xl"></div>

        {/* thumbnail phía dưới */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Tiêu đề */}
          <div className="h-10 w-2/3 bg-gray-700 rounded-md mb-4"></div>
          {/* Giá */}
          <div className="h-8 w-1/3 bg-gray-700 rounded-md mb-6"></div>
          {/* Mô tả */}
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded-md w-4/6"></div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="h-12 bg-gray-700 rounded-xl"></div>
          <div className="h-12 border-2 border-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

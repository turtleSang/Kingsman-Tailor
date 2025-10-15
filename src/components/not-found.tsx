"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NotFoundProps {
  title?: string;
  description?: string;
  icon?: IconProp;
  action?: ReactNode;
}

export default function NotFound({
  title = "Không tìm thấy nội dung",
  description = "Chúng tôi không thể tìm thấy thông tin bạn đang cần.",
  icon,
  action,
}: NotFoundProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[--color-charcoal] rounded-2xl border border-[--color-border]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon hoặc fallback */}
        <div className="mb-6 text-7xl text-primary">
          <FontAwesomeIcon icon={icon ? icon : faBan} />
        </div>

        <h2 className="text-[--color-gold] text-3xl font-heading mb-3">
          {title}
        </h2>

        <p className="text-[--color-text-secondary] max-w-md mx-auto mb-6">
          {description}
        </p>

        {action && <div>{action}</div>}
      </motion.div>
    </section>
  );
}

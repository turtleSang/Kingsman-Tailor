"use client";

import { usePathname } from "next/navigation";
import { useCategory } from "../../../libs/fetch";
import { useEffect, useState } from "react";
import NotFound from "../not-found";
import Loading from "../loading";
import Link from "next/link";
import { motion } from "motion/react";
import CategoryButoonSkeleton from "../skeleton/CategoryButoonSkeleton";

export default function ProductNav() {
  const { categories, error, isLoading } = useCategory();
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const link = pathName.split("/");
    if (link[2]) {
      setActiveTab(link[2]);
    } else {
      setActiveTab("");
    }
  }, [pathName]);

  return (
    <div className="relative">
      {error && <NotFound />}
      {isLoading && <CategoryButoonSkeleton />}
      {categories && categories.length > 0 && (
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          {categories.map((category) => {
            return (
              <Link
                className="block relative p-3 border-border border-2 rounded-md overflow-hidden "
                href={`/san-pham/${category.link}`}
                key={`category-${category.id}`}
              >
                {category.name}
                {activeTab === category.link && (
                  <motion.div
                    layoutId="nav-Product"
                    id="nav-Product"
                    className="absolute top-0 left-0 w-full h-full bg-primary-dark rounded-md -z-20"
                  ></motion.div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

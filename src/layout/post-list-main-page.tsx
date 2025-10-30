import { LogoFont } from "@/app/layout";
import clsx from "clsx";
import { prisma } from "../../libs/prisma";
import NotFound from "@/components/not-found";
import CardPost from "@/components/post/card-post";
import Link from "next/link";

export const revalidate = 60;

export default async function PostListMainPage() {
  const listPost = await prisma.post.findMany({
    skip: 0,
    take: 2,
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="mt-10 w-10/12 mx-auto">
      <h2
        className={clsx(
          "text-center uppercase w-full mx-auto",
          LogoFont.className
        )}
      >
        Tin Tức Kingsman
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {listPost.length === 0 && (
          <NotFound
            title="404 Bài viết"
            description="Không tìm thấy tin tức nào"
          />
        )}
        {listPost.map((item) => {
          return (
            <CardPost
              key={`post-${item.id}`}
              thumbnail={item.thumnail}
              title={item.title}
              excerpt={item.excerpt}
              link={item.link}
            />
          );
        })}
      </div>
      <div className="mt-5 text-center">
        <Link className="inline-block button-outline" href={"/tin-tuc"}>
          Xem thêm tin tức
        </Link>
      </div>
    </div>
  );
}

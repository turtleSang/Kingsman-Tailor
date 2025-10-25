"use client";

import NotFound from "@/components/not-found";
import CardPost from "@/components/post/card-post";
import PostCardSkeleton from "@/components/skeleton/PostCardSkeleton";
import { Post } from "@/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PostPage() {
  const [listPost, setListPost] = useState<Post[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListPost = async (page: number) => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post`;
    try {
      const res = await axios.get(url, { params: { page } });
      const { listPost, hasMore } = res.data as {
        listPost: Post[];
        hasMore: boolean;
      };
      if (page === 1) {
        setListPost(listPost);
      } else {
        setListPost((preVal) => {
          return [...preVal, ...listPost];
        });
      }
      setCanShowMore(hasMore);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getListPost(page);
  }, []);

  return (
    <div>
      {!isLoading && listPost.length === 0 && <NotFound title="404 post" />}
      {isLoading && <PostCardSkeleton />}
      {listPost.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {listPost.map((item) => {
            return (
              <CardPost
                thumbnail={item.thumnail}
                title={item.title}
                excerpt={item.excerpt}
                link={item.link}
                key={`post-${item.id}`}
              />
            );
          })}
        </div>
      )}
      {canShowMore && (
        <div className="mt-5 flex justify-center">
          <button
            className="button-normal"
            onClick={() => {
              const pageNumber = page + 1;
              setPage(pageNumber);
              getListPost(pageNumber);
            }}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}

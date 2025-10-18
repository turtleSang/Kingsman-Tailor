"use client";

import FeedBackCard, {
  FeedBackCardProps,
} from "@/components/feedback/feedback-card";
import NotFound from "@/components/not-found";
import FeedbackCardSkeleton from "@/components/skeleton/FeedBackSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PageMainFeedBack() {
  const [listFeedback, setListFeedback] = useState<FeedBackCardProps[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListFeedback = async (page: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;

    try {
      const res = await axios.get(url, { params: { page } });

      const data = res.data as {
        listFeedback: FeedBackCardProps[];
        hasMore: boolean;
      };
      console.log(data);

      if (page === 1) {
        setListFeedback(data.listFeedback);
      } else {
        setListFeedback((val) => {
          return [...val, ...data.listFeedback];
        });
      }
      setCanShowMore(data.hasMore);
      setIsLoading(false);
    } catch (error) {
      setCanShowMore(false);
      setIsLoading(false);
      setListFeedback([]);
    }
  };

  useEffect(() => {
    getListFeedback(page);
  }, []);

  return (
    <div>
      {listFeedback.length === 0 && !isLoading && (
        <NotFound
          title="404 Not found"
          description="Không có sản phẩm nào để hiển thị"
        />
      )}
      {isLoading && <FeedbackCardSkeleton />}

      {listFeedback.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-3">
          {listFeedback.map((feedback) => {
            return (
              <FeedBackCard
                key={`feedback-${feedback.id}`}
                id={feedback.id}
                image={feedback.image}
                customerName={feedback.customerName}
                feedback={feedback.feedback}
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
              getListFeedback(pageNumber);
            }}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}

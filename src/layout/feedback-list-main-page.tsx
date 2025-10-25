import { LogoFont } from "@/app/layout";
import { FeedBackCardProps } from "@/components/feedback/feedback-card";
import FeedbackSlider from "@/components/feedback/feedback-slider";
import NotFound from "@/components/not-found";
import clsx from "clsx";
import { prisma } from "../../libs/prisma";
import { pageSize } from "../../libs/constance";

export default async function FeedBackListMainPage() {
  try {
    const list = await prisma.feedBack.findMany({ skip: 0, take: pageSize });
    const listFeedback = list as FeedBackCardProps[];
    return (
      <div className="mt-10">
        <h2
          className={clsx(
            "text-center uppercase w-full mx-auto",
            LogoFont.className
          )}
        >
          Đem đến trải nghiệm tốt nhất dành cho khách hàng
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-center mx-auto mb-4">
          Sự khác biệt của một bộ Suit nằm ở sự vừa vặn hoàn hảo. Đội ngũ chuyên
          gia của chúng tôi luôn sẵn sàng lắng nghe và tư vấn chi tiết về form
          dáng, màu sắc, và chất liệu phù hợp nhất với vóc dáng, mục đích sử
          dụng cũng như phong cách cá nhân của bạn.
        </p>
        <div className="w-3/4 mx-auto">
          {listFeedback && listFeedback.length > 0 && (
            <FeedbackSlider listFeedback={listFeedback} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-10/12 mx-auto">
        <NotFound title="404 Không tìm thấy feedback nào" />
      </div>
    );
  }
}

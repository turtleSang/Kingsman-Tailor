import { LogoFont } from "@/app/layout";
import CategoryCard, {
  CategoryCardProps,
} from "@/components/category/category-card";
import CategorySlider from "@/components/category/category-slider";
import NotFound from "@/components/not-found";
import axios from "axios";
import clsx from "clsx";

export default async function CategoryListMainPage() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;

  try {
    const res = await axios.get(url);
    const listCategory = res.data as CategoryCardProps[];

    return (
      <div className="mt-5">
        <h2
          className={clsx(
            "text-center uppercase w-8/12 mx-auto",
            LogoFont.className
          )}
        >
          Thiết kế và tư vấn về ăn mặc lịch lãm
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-center mx-auto mb-4">
          Tự tin khẳng định phong thái cá nhân trong mọi sự kiện. Tại đây, chúng
          tôi mang đến những bộ Suit & Veston được thiết kế tinh xảo, cắt may tỉ
          mỉ theo tiêu chuẩn Châu Âu, giúp Quý Ông và Quý Cô toát lên vẻ lịch
          lãm hoàn hảo nhất
        </p>

        {listCategory && listCategory.length > 0 && (
          <CategorySlider listCategory={listCategory} />
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="w-10/12 mx-auto">
        <NotFound title="404 không tìm thấy mục nào" />
      </div>
    );
  }
}

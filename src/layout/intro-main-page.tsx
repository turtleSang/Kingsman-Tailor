import { LogoFont } from "@/app/layout";
import ProcessIntro from "@/components/intro/process-item-main-page";
import clsx from "clsx";
import Link from "next/link";

export default function IntroMainPage() {
  return (
    <div className="mt-10 w-10/12 mx-auto">
      <div className="grid">
        <div className="space-y-5">
          <h2
            className={clsx(
              "text-center uppercase w-8/12 mx-auto",
              LogoFont.className
            )}
          >
            Về <span className="text-yellow-500">Kingsman Tailor</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Thành lập từ năm 2017, Kingsman Tailor tự hào là thương hiệu may đo
            cao cấp dành cho quý ông yêu thích phong cách lịch lãm và tinh tế.
            Với triết lý “Phong thái tạo nên đẳng cấp”, chúng tôi mang đến những
            bộ âu phục vừa vặn hoàn hảo, thể hiện cá tính riêng và sự tự tin
            trong từng chi tiết.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Mỗi bộ vest tại Kingsman Tailor đều được thực hiện thủ công bởi đội
            ngũ thợ lành nghề, sử dụng chất liệu vải nhập khẩu cao cấp cùng kỹ
            thuật cắt may chuẩn Anh Quốc. Chúng tôi không chỉ tạo ra trang phục,
            mà còn kiến tạo phong cách sống – nơi mỗi quý ông được tôn vinh trọn
            vẹn.
          </p>
          <div className="text-center">
            <Link
              href="/gioi-thieu"
              className="inline-block mt-5 button-outline"
            >
              Tìm hiểu thêm về chúng tôi
            </Link>
          </div>
        </div>
        <ProcessIntro />
      </div>
    </div>
  );
}

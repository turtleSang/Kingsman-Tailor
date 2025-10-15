import CardText from "@/components/CardText";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faComment, faImage } from "@fortawesome/free-regular-svg-icons";
import { faList, faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ListAdminMananger: {
  link: string;
  title: string;
  icon: IconProp;
  description: string;
}[] = [
  {
    title: "banner",
    icon: faImage,
    link: "/admin/banner",
    description: "Thêm xóa sửa banner",
  },
  {
    title: "feedback",
    icon: faComment,
    link: "/admin/feedback",
    description: "Thêm xóa sửa feedback của khách hàng",
  },
  {
    title: "category",
    icon: faList,
    link: "/admin/category",
    description: "Thêm hoặc chỉnh sửa danh mục hàng",
  },
  {
    title: "product",
    icon: faShirt,
    link: "/admin/product",
    description: "Thêm xóa sửa sản phẩm",
  },
];

export default function Page() {
  return (
    <div className="">
      <div className="grid gap-1 grid-cols-1 md:grid-cols-2">
        {ListAdminMananger.map((item, index) => {
          return (
            <CardText key={index} link={`${item.link}`}>
              <div className="flex flex-row justify-evenly">
                <FontAwesomeIcon
                  className="text-primary-dark text-4xl lg:text-7xl inline-block w-1/2"
                  icon={item.icon}
                />
                <div className="text-center w-1/2">
                  <h3 className="uppercase">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </CardText>
          );
        })}
      </div>
      <div className="my-10 text-center">
        <Link className="button-normal inline-block" href={"/api/auth/signout"}>
          Đăng xuất
        </Link>
      </div>
    </div>
  );
}

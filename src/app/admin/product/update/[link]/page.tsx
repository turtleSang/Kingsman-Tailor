import FormUpdateProduct from "@/components/form/form-update-product";
import NotFound from "@/components/not-found";
import axios from "axios";

interface Product {
  id: number;
  price: number;
  categoryId: number;
  name: string;
  description: string;
  thumbnail: string;
  imagesUrl: { url: string }[];
}

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/detail`;
  const res = await axios.get(url, { params: { product: link } });

  if (!res.data) {
    return (
      <div className="mt-5">
        <NotFound
          title="404 Not Found Feedback"
          description="Không tìm thấy sản phẩm"
        />
      </div>
    );
  }
  const { categoryId, description, id, imagesUrl, name, price, thumbnail } =
    res.data as Product;
  const listUrlImg: string[] = imagesUrl.map((val) => `/${val.url}`);

  return (
    <FormUpdateProduct
      id={id}
      link={link}
      nameOld={name}
      thumbnailOld={thumbnail}
      descriptionOld={description}
      categoryOld={categoryId}
      priceOld={price}
      imagesUrl={listUrlImg}
    />
  );
}

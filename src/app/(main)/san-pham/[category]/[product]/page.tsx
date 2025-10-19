import ProductDetail, {
  ProductDetailProps,
} from "@/components/product/product-detail";
import axios from "axios";

export default async function PageProductDetail({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/detail/`;
  const res = await axios.get(url, { params: { product } });
  const productProps = res.data as ProductDetailProps;

  return (
    <div>
      <ProductDetail
        name={productProps.name}
        description={productProps.description}
        price={productProps.price}
        thumbnail={productProps.thumbnail}
        imagesUrl={productProps.imagesUrl}
      />
    </div>
  );
}

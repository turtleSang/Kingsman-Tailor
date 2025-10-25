import NotFound from "@/components/not-found";
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
  const url = `api/product/detail/`;

  try {
    const res = await axios.get(url, { params: { product } });
    const productProps = res.data as ProductDetailProps;
    return (
      <div>
        <ProductDetail
          category={productProps.category}
          name={productProps.name}
          description={productProps.description}
          price={productProps.price}
          thumbnail={productProps.thumbnail}
          imagesUrl={productProps.imagesUrl}
        />
      </div>
    );
  } catch (error) {
    return (
      <NotFound title="404 Not found" description="Sản phẩm không tồn tại" />
    );
  }
}

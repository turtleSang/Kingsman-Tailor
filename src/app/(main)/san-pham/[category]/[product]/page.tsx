import NotFound from "@/components/not-found";
import ProductDetail, {
  ProductDetailProps,
} from "@/components/product/product-detail";
import { prisma } from "../../../../../../libs/prisma";

export const revalidate = 60;

export default async function PageProductDetail({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;

  try {
    const res = await prisma.product.findUniqueOrThrow({
      where: { link: product },
      include: { category: true, imagesUrl: true },
    });
    const productProps = res as ProductDetailProps;
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

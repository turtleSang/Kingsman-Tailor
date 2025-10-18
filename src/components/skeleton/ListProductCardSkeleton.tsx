import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ListProductCardSkeleton() {
  const list = new Array(6).fill("");
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {list.map((val, index) => {
        return <ProductCardSkeleton key={`ske${index}`} />;
      })}
    </div>
  );
}

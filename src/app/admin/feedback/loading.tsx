import LargeCardSkeleton from "@/components/skeleton/LargeCardSkeleton";

export default function Loading() {
  const arr = new Array(5).fill("");
  return (
    <div>
      {arr.map((_, index) => {
        return <LargeCardSkeleton key={index} />;
      })}
    </div>
  );
}

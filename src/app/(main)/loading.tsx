import Loading from "@/components/loading";

export default function LoadingMain() {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black z-50">
      <Loading />
    </div>
  );
}

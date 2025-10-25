import Link from "next/link";

export default function AdminPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link href={"./post/create"} className="button-normal mb-5 inline-block">
        Tạo mới bài viết
      </Link>
      {children}
    </div>
  );
}

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Đăng nhập quản trị</h1>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Đăng nhập bằng Google
      </Link>
    </div>
  );
}

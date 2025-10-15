import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { LogoFont } from "../layout";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Link href={"/admin"}>
        <h1 className="text-center uppercase lg:mt-5 flex flex-row justify-center items-center mt-3">
          <Image alt="Logo" src={"/logo.png"} height={70} width={70} />
          <span className={LogoFont.className}>ingsman Manager</span>
        </h1>
      </Link>
      <div className="w-10/12 mx-auto">{children}</div>
    </div>
  );
}

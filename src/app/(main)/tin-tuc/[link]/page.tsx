import NotFound from "@/components/not-found";
import { prisma } from "../../../../../libs/prisma";
import Image from "next/image";
import { LogoFont } from "@/app/layout";
import { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ link: string }>;
}): Promise<Metadata> {
  const { link } = await params;
  const post = await prisma.post.findUniqueOrThrow({
    where: { link },
  });
  return {
    title: `${post.title} | Kingsman tailor`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Kingsman tailor`,
      description: post.excerpt,
      type: "website",
      locale: "vi-VN",
      images: [{ url: `/${post.thumnail}`, width: 1280, height: 720 }],
    },
  };
}

export async function generateStaticParams() {
  const postList = await prisma.post.findMany({ select: { link: true } });
  return postList.map((item) => ({ link: item.link }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { link },
    });

    return (
      <div>
        <h1 className={LogoFont.className}>{post.title}</h1>
        <h5 className="font-bold text-primary-dark text-xl">{post.excerpt}</h5>
        <div className="relative aspect-video">
          <Image
            src={`/${post.thumnail}`}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    );
  } catch (error) {
    return <NotFound title="404 Post" description="Không tìm thấy bài viết" />;
  }
}

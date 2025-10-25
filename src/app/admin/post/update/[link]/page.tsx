import NotFound from "@/components/not-found";
import { prisma } from "../../../../../../libs/prisma";
import FormUpdatePost from "@/components/form/form-update-post";

export default async function PageUpdatePost({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  console.log(link);

  try {
    const post = await prisma.post.findUniqueOrThrow({ where: { link: link } });

    return (
      <div>
        <FormUpdatePost
          id={post.id}
          titleOld={post.title}
          excerptOld={post.excerpt}
          contentOld={post.content}
          thumbnailOld={post.thumnail}
        />
      </div>
    );
  } catch (error) {
    return <NotFound title="404 post" />;
  }
}

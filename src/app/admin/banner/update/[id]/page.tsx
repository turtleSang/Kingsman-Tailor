import FormUpdateBanner, {
  FormUpdateBannerProps,
} from "@/components/form/form-update-banner";
import NotFound from "@/components/not-found";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import path from "path";
import fs from "fs";

export default async function UpdateBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/banner/detail?id=${id}`;

  try {
    const result = await axios.get(url);
    const { description, id, imageUrl, link } = result.data as {
      id: number;
      description: string;
      imageUrl: string;
      link: string;
    };
    const filePath = path.join(process.cwd(), "public", imageUrl);
    const file = (await fs.promises.readFile(filePath)) || null;
    return (
      <FormUpdateBanner
        description={description}
        id={id}
        imageUrl={imageUrl}
        link={link}
      />
    );
  } catch (error) {
    return (
      <div>
        <NotFound
          title="404 Not Found"
          description="Không tìm thấy banner"
          icon={faLock}
        />
      </div>
    );
  }
}

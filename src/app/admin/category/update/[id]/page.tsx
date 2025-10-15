import FormUpdateCategory from "@/components/form/form-update-category";
import NotFound from "@/components/not-found";
import axios from "axios";

export default async function PageUpdateCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
  try {
    const result = await axios.get(url, { params: { id } });
    const category = result.data as {
      id: number;
      name: string;
      link: string;
      urlImg: string;
    };

    return (
      <FormUpdateCategory
        id={category.id}
        link={category.link}
        name={category.name}
        urlImg={category.urlImg}
      />
    );
  } catch (error) {
    return (
      <div className="mt-5">
        <NotFound
          title="404 Not Found Category"
          description="Không tìm thấy category theo đường dẫn"
        />
      </div>
    );
  }
}

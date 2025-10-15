import FormUpdateFeedback, {
  FormUpdateFeedBackProps,
} from "@/components/form/form-update-feedback";
import NotFound from "@/components/not-found";
import axios from "axios";

export default async function PageUpdateFeedBack({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;
  try {
    const result = await axios.get(url, { params: { id } });
    const { customerName, feedback, image } = result.data as {
      customerName: string;
      feedback: string;
      image: string;
    };

    return (
      <div className="mt-5">
        <FormUpdateFeedback
          currentId={Number(id)}
          customerNameOld={customerName}
          imageOld={image}
          feedbackOld={feedback}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="mt-5">
        <NotFound
          title="404 Not Found Feedback"
          description="Không tìm thấy feedback"
        />
      </div>
    );
  }
}

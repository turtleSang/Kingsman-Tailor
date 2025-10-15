import FormCreateFeedback from "@/components/form/form-create-feedback";
import Modal from "@/components/modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LayoutFeedbackAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Modal
        buttonProps={{ className: "button-normal" }}
        buttonTxt={
          <>
            Tạo mới Feedback <FontAwesomeIcon className="ml-3" icon={faPlus} />
          </>
        }
        data={<FormCreateFeedback />}
      />
      {children}
    </div>
  );
}

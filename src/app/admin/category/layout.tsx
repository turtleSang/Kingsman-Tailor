import FormCreateCategory from "@/components/form/form-create-category";
import Modal from "@/components/modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LayoutCategory({
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
            Tạo danh mục mới <FontAwesomeIcon icon={faPlus} />
          </>
        }
        data={<FormCreateCategory />}
      />
      {children}
    </div>
  );
}

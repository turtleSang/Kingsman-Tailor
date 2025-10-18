import FormCreateProduct from "@/components/form/form-create-product";
import Modal from "@/components/modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LayoutPageProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Modal
        buttonProps={{
          className: "button-normal",
        }}
        buttonTxt={
          <>
            Tạo mới sản phẩm <FontAwesomeIcon icon={faPlus} />
          </>
        }
        data={<FormCreateProduct />}
      />
      {children}
    </div>
  );
}

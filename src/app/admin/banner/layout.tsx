import FormCreateBanner from "@/components/form/form-create-banner";
import Modal from "@/components/modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LayoutBannerAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3">
        <Modal
          buttonTxt={
            <>
              Tạo Banner Mới <FontAwesomeIcon icon={faPlus} />
            </>
          }
          buttonProps={{
            className: "button-normal",
          }}
          data={<FormCreateBanner />}
        />
      </div>
      {children}
    </div>
  );
}

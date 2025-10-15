"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import Notification, { NotificationProps } from "../notification";
import { usePathname, useRouter } from "next/navigation";
import { ModalContext } from "../modal/modal";
import axios, { AxiosError } from "axios";
import Loading from "../loading";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";

export default function FormCreateFeedback() {
  const [image, setImage] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const modalContext = useContext(ModalContext);
  const router = useRouter();
  const pathName = usePathname();

  const SetImage = (fileImage: File) => {
    setImage(fileImage);
  };

  const handleCustomerName = (e: FormEvent<HTMLInputElement>) => {
    setCustomerName(e.currentTarget.value);
  };

  const handleFeedBack = (e: FormEvent<HTMLTextAreaElement>) => {
    setFeedback(e.currentTarget.value);
  };

  useEffect(() => {
    ResetForm();
  }, []);

  const HandleUpload = () => {
    if (!image || image.size === 0 || !customerName || !feedback) {
      const notification: NotificationProps = {
        message: "Vui Lòng Điền đầy đủ thông tin",
        type: "warning",
      };
      setNotification(notification);
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image as File);
    formData.append("feedback", feedback.trim());
    formData.append("customerName", customerName.trim());
    const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;
    axios
      .post(url, formData)
      .then((res) => {
        const notification: NotificationProps = {
          message: res.data.message,
          type: "success",
        };
        setNotification(notification);
        ResetForm();
        if (modalContext) {
          modalContext.setCloseModal();
        }
        router.push(pathName);
      })
      .catch((err) => {
        const error = err as AxiosError;
        const data = error.response?.data;
        const { message } = (data as { message: string }) || "";
        const notification: NotificationProps = {
          message,
          type: "error",
        };
        setNotification(notification);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ResetForm = () => {
    setImage(null);
    setCustomerName("");
    setFeedback("");
    setNotification(null);
  };

  return (
    <div className="relative">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {isLoading && <Loading />}
      <InputText
        placeholder="Tên khách hàng"
        lableName="Tên khách hàng"
        onChange={(event) => {
          handleCustomerName(event);
        }}
      />
      <InputArea
        lableName="Feedback của khách hàng"
        placeholder="Nhập feedback của khách hàng"
        onChange={(event) => handleFeedBack(event)}
      />
      <InputImageSingle handleFile={SetImage} />
      <div className="text-center mt-2">
        <button className="button-normal" type="button" onClick={HandleUpload}>
          Tạo Feedback
        </button>
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import Notification, { NotificationProps } from "../notification";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Loading from "../loading";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import ButtonDelete from "../button-delete";

export interface FormUpdateFeedBackProps {
  currentId: number;
  imageOld: string;
  customerNameOld: string;
  feedbackOld: string;
}

export default function FormUpdateFeedback({
  customerNameOld,
  feedbackOld,
  currentId,
  imageOld,
}: FormUpdateFeedBackProps) {
  const [image, setImage] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>(feedbackOld);
  const [customerName, setCustomerName] = useState<string>(customerNameOld);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

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

  const HandleUpload = () => {
    console.log(customerName, 123);
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
    formData.append("id", currentId.toString());
    formData.append("image", image as File);
    formData.append("feedback", feedback.trim());
    formData.append("customerName", customerName.trim());
    const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;
    axios
      .put(url, formData)
      .then((res) => {
        const notification: NotificationProps = {
          message: res.data.message,
          type: "success",
        };
        setNotification(notification);

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

  const handleDelete = (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;
    axios
      .delete(url, { params: { id: currentId } })
      .then((res) => {
        const { message } = res.data as { message: string };
        if (handleNotification) {
          const newNotification: NotificationProps = {
            message: message || "Đã xóa thành công",
            type: "success",
          };
          handleNotification(newNotification);
        }
        setTimeout(() => {
          router.push("/admin/feedback");
        }, 1000);
      })
      .catch((err) => {
        const error = err as AxiosError;
        const { message } =
          (error.response?.data as { message: string }) || "Lỗi hệ thống";
        if (handleNotification) {
          handleNotification({ message, type: "error" });
        }
      })
      .finally(() => {
        if (closeLoading) {
          closeLoading();
        }
      });
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
        value={customerName}
        onChange={(event) => {
          handleCustomerName(event);
        }}
      />
      <InputArea
        lableName="Feedback của khách hàng"
        placeholder="Nhập feedback của khách hàng"
        onChange={(event) => handleFeedBack(event)}
        value={feedback}
      />
      <InputImageSingle handleFile={SetImage} oldFile={imageOld} />
      <div className="text-center my-3 flex justify-around">
        <button className="button-normal" type="button" onClick={HandleUpload}>
          Cập nhật Feedback
        </button>
        <ButtonDelete
          buttonName="Xóa Feed Back"
          contentDelete={`Chắc chắn xóa feedback của ${customerNameOld} ?`}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

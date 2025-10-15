"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputImageSingle from "../input/input-image-single";
import Loading from "../loading";
import Notification, { NotificationProps } from "../notification";
import axios, { AxiosError } from "axios";
import { ModalContext } from "../modal/modal";
import { usePathname, useRouter } from "next/navigation";

export default function FormCreateCategory() {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const modalContext = useContext(ModalContext);
  const router = useRouter();

  const handleName = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    setName(value);
  };

  const handleFile = (file: File) => {
    setImage(file);
  };

  const handleUploadFile = () => {
    if (!name.trim() || !image || image.size == 0) {
      setNotification({
        message: "Vui lòng nhập đầy đủ thông tin",
        type: "warning",
      });
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("image", image);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
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
        router.refresh();
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
    setName("");
    setImage(null);
  };

  useEffect(() => {
    ResetForm();
  }, []);

  return (
    <div className="relative">
      {isLoading && <Loading />}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <InputText
        lableName="Tên danh mục"
        placeholder="Nhập tên danh mục"
        onChange={(e) => handleName(e)}
      />
      <InputImageSingle handleFile={handleFile} />
      <div className="flex justify-center items-center mt-3">
        <button
          type="button"
          className="button-normal"
          onClick={handleUploadFile}
        >
          Tạo danh mục
        </button>
      </div>
    </div>
  );
}

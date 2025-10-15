"use client";
import { FormEvent, InputHTMLAttributes, useState } from "react";
import InputText from "../input/input-text";
import InputImageSingle from "../input/input-image-single";
import Notification, { NotificationProps } from "../notification";
import Loading from "../loading";
import ButtonDelete from "../button-delete";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export interface FormUpdateCategoryProps {
  name: string;
  link: string;
  id: number;
  urlImg: string;
}

export default function FormUpdateCategory({
  id,
  link,
  name,
  urlImg,
}: FormUpdateCategoryProps) {
  const [inputName, setInputName] = useState<string>(name);
  const [inputImage, setInputImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const router = useRouter();

  const handleFile = (file: File) => {
    setInputImage(file);
  };

  const handleName = (e: FormEvent<HTMLInputElement>) => {
    setInputName(e.currentTarget.value);
  };

  const handleUpdate = () => {
    if (!inputImage || inputImage.size === 0 || !inputName.trim()) {
      setNotification({
        message: "Vui lòng điền đẩy đủ thông tin",
        type: "warning",
      });
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("name", inputName.trim());
    formData.append("image", inputImage);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    axios
      .put(url, formData)
      .then((res) => {
        const { message } = res.data;
        setNotification({
          message,
          type: "success",
        });
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

  const handleDelete = (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    axios
      .delete(url, { params: { id } })
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
          router.push("/admin/banner");
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

  useState<string>(name);
  return (
    <div className="relative">
      {isLoading && <Loading />}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <InputText lableName="ID" value={id} disabled onChange={() => {}} />
      <InputText lableName="Link" value={link} disabled />
      <InputText
        lableName="Tên danh mục"
        value={inputName}
        onChange={(e) => handleName(e)}
      />
      <InputImageSingle handleFile={handleFile} oldFile={urlImg} />
      <div className="p-3 flex flex-row justify-around">
        <button className="button-normal" onClick={handleUpdate}>
          Cập nhật danh mục
        </button>
        <ButtonDelete
          buttonName="Xóa danh mục"
          contentDelete={`Xóa danh mục ${name}`}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

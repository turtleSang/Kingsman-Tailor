"use client";

import { FormEvent, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import Modal from "../modal/modal";
import Notification, { NotificationProps } from "../notification";
import Loading from "../loading";
import ButtonDelete from "../button-delete";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export interface FormUpdateBannerProps {
  id: number;
  description: string;
  imageUrl: string;
  link: string;
}

export default function FormUpdateBanner({
  description,
  id,
  imageUrl,
  link,
}: FormUpdateBannerProps) {
  const [inputDescription, setInputDescripton] = useState<string>(description);
  const [inputLink, setInputLink] = useState<string>(link);
  const [fileUpdate, setFileUpdate] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationProps>();
  const router = useRouter();

  const handleDescription = (event: FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setInputDescripton(value.trim());
  };

  const handleLink = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputLink(value.trim());
  };

  const handleFileUpdate = (file: File) => {
    setFileUpdate(file);
  };

  const handleUpdate = () => {
    if (
      !fileUpdate ||
      fileUpdate.size === 0 ||
      !inputDescription.trim() ||
      !inputLink.trim() ||
      !id
    ) {
      const newNotification: NotificationProps = {
        message: "Vui lòng điền đầy đủ thông tin",
        type: "warning",
      };
      setNotification(newNotification);
      return;
    }
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("id", id.toString());
    formdata.append("description", inputDescription.trim());
    formdata.append("link", inputLink.trim());
    formdata.append("image", fileUpdate as File);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banner`;
    axios
      .put(url, formdata)
      .then((res) => {
        const { message } = res.data;
        setNotification({
          message,
          type: "success",
        });
      })
      .catch((err) => {
        setNotification({
          message: "Lỗi Hệ Thống",
          type: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banner`;
    axios
      .delete(url, { params: { id: id } })
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

  return (
    <div className="relative">
      {isLoading && <Loading />}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <InputText lableName="ID" value={id} disabled />
      <InputArea
        lableName="Mô tả"
        value={inputDescription.toString()}
        onChange={(e) => handleDescription(e)}
      />
      <InputText
        lableName="Link"
        value={inputLink.toString()}
        onChange={(e) => handleLink(e)}
      />
      <InputImageSingle
        labelName="Upload hình ảnh banner"
        oldFile={imageUrl}
        handleFile={handleFileUpdate}
      />
      <div className="p-3 flex flex-row justify-around">
        <button className="button-normal" onClick={handleUpdate}>
          Cập nhật
        </button>
        <ButtonDelete
          contentDelete={`Bạn muốn xóa banner ${id}`}
          buttonName="Xóa Banner"
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

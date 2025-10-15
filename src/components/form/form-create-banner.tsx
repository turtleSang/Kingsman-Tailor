"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import Notification, { NotificationProps } from "../notification";
import { usePathname, useRouter } from "next/navigation";
import { ModalContext } from "../modal/modal";

export default function FormCreateBanner() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
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

  const SetDescription = (event: FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setDescription(value.trim());
  };

  const SetLink = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setLink(value.trim());
  };

  useEffect(() => {
    ResetForm();
  }, []);

  const HandleUpload = () => {
    if (!image || image.size === 0 || !description || !link) {
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
    formData.append("description", description.trim());
    formData.append("link", link.trim());
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banner`;
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
    setLink("");
    setDescription("");
    setNotification(null);
  };

  return (
    <div className="relative">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {isLoading && <Loading />}
      <InputText
        placeholder="Liên kết sản phẩm/chương trình"
        lableName="Liên kết:"
        onChange={(event) => {
          SetLink(event);
        }}
      />
      <InputArea
        lableName="Mô tả"
        placeholder="Mô tả về chương trình hoặc sản phẩm trên banner"
        onChange={(event) => SetDescription(event)}
      />
      <InputImageSingle handleFile={SetImage} />
      <div className="text-center mt-2">
        <button className="button-normal" type="button" onClick={HandleUpload}>
          Tạo Banner
        </button>
      </div>
    </div>
  );
}

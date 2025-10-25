"use client";

import { FormEvent, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Notification, { NotificationProps } from "../notification";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ButtonDelete from "../button-delete";

export interface FormUpdatePostProps {
  id: number;
  titleOld: string;
  excerptOld: string;
  contentOld: string;
  thumbnailOld: string;
}

export default function FormUpdatePost({
  contentOld,
  excerptOld,
  thumbnailOld,
  titleOld,
  id,
}: FormUpdatePostProps) {
  const [title, setTitle] = useState<string>(titleOld);
  const [excerpt, setExcerpt] = useState<string>(excerptOld);
  const [content, setContent] = useState<string>(contentOld);
  const [image, setImage] = useState<File | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ header: [2, 3, false] }],
        ["link"],
      ],
    },
  });

  const router = useRouter();

  const handleTitle = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleExcerpt = (e: FormEvent<HTMLTextAreaElement>) => {
    setExcerpt(e.currentTarget.value);
  };

  const handleImage = (file: File) => {
    setImage(file);
  };

  const handleDelete = (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post`;
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
          router.push("/admin/post");
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

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = contentOld;
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleUpload = () => {
    if (!title || !content || !excerpt || !image || image.size === 0) {
      setNotification({
        message: "Vui lòng điền đầy đủ thông tin",
        type: "error",
      });
      return;
    }
    setLoading(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("excerpt", excerpt);
    formdata.append("content", content);
    formdata.append("image", image);
    formdata.append("id", id.toString());
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post/`;
    axios
      .put(url, formdata)
      .then((res) => {
        const message = res.data.message || "Tạo bài viết thành công";
        setNotification({
          message,
          type: "success",
        });
      })
      .catch((err) => {
        setNotification({
          message: "Tạo bài viết thất bại",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      {loading && <Loading />}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <InputText
        lableName="Tên bài viết"
        placeholder="Nhập tiêu đề"
        onChange={(e) => handleTitle(e)}
        value={title}
      />
      <InputArea
        lableName="Đoạn tóm tắt bài viết"
        placeholder="Nhập đoạn tóm tắt bài viết"
        onChange={(e) => handleExcerpt(e)}
        value={excerpt}
      />
      <InputImageSingle
        labelName={"Tải hình bài viết"}
        handleFile={handleImage}
        oldFile={thumbnailOld}
      />
      <div className="my-3">Nhập Bài Viết</div>
      <div ref={quillRef}></div>
      <div className="my-3 flex justify-around">
        <button
          className="button-normal"
          type="button"
          onClick={() => handleUpload()}
        >
          Cập nhật bài viết
        </button>
        <ButtonDelete
          buttonName="Xóa bài viết"
          contentDelete={`Đồng ý xóa bài viết ${titleOld} ?`}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Notification, { NotificationProps } from "../notification";
import Loading from "../loading";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormCreatePost() {
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
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

  useEffect(() => {
    if (quill) {
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

    const url = `${process.env.NEXT_PUBLIC_API_URL}/post/`;
    axios
      .post(url, formdata)
      .then((res) => {
        const message = res.data.message || "Tạo bài viết thành công";
        setNotification({
          message,
          type: "success",
        });
        setTimeout(() => {
          router.refresh();
        }, 1000);
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
      />
      <div className="my-3">Nhập Bài Viết</div>
      <div ref={quillRef}></div>
      <div className="my-3 flex justify-center">
        <button
          className="button-normal"
          type="button"
          onClick={() => handleUpload()}
        >
          Tạo mới bài viết
        </button>
      </div>
    </div>
  );
}

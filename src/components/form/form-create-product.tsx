"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import InputText from "../input/input-text";
import InputArea from "../input/input-area";
import InputImageSingle from "../input/input-image-single";
import InputImageMultiple from "../input/input-image-multiple";
import { useCategory } from "../../../libs/fetch";
import InputDropDown from "../input/input-dropdown";
import InputNumber from "../input/input-number";

import Notification, { NotificationProps } from "../notification";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ModalContext } from "../modal/modal";

export default function FormCreateProduct() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [thumnail, setThumnail] = useState<File>();
  const [listImageProduct, setListImageProduct] = useState<File[]>();
  const { categories, error, isLoading } = useCategory();
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();
  const modalContext = useContext(ModalContext);

  const handleName = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleDescription = (e: FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handlePrice = (num: number) => {
    setPrice(num);
  };

  const handleCategoryId = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  const handleThumnail = (file: File) => {
    setThumnail(file);
  };

  const handleListImage = (listFile: File[]) => {
    setListImageProduct(listFile);
  };

  const resetForm = () => {
    setName("");
    setCategoryId(0);
    setDescription("");
    setListImageProduct([]);
    setThumnail(undefined);
    setPrice(0);
    setIsLoadingForm(false);
    setNotification(null);
  };

  const HandleUpload = () => {
    if (
      !name ||
      !description ||
      !price ||
      categoryId === 0 ||
      !thumnail ||
      thumnail.size === 0 ||
      !listImageProduct ||
      listImageProduct.length === 0
    ) {
      setNotification({
        message: "Vui lòng điền đầy đủ thông tin",
        type: "warning",
      });
      return;
    }
    setIsLoadingForm(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("categoryId", categoryId.toString());
    formData.append("description", description);
    listImageProduct.forEach((file) => formData.append("images", file));
    formData.append("thumbnail", thumnail!);
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const notification: NotificationProps = {
          message: res.data.message,
          type: "success",
        };
        router.push(pathName);
        setNotification(notification);
        resetForm();
        if (modalContext) {
          modalContext.setCloseModal();
        }
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
        setIsLoadingForm(false);
      });
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div className="relative">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {isLoadingForm && <Loading />}
      <InputText
        lableName="Tên sản phẩm"
        onChange={(e) => handleName(e)}
        placeholder="Nhập tên sản phẩm"
        value={name}
      />
      <InputArea
        lableName="Mô tả sản phẩm"
        placeholder="Nhập mô tả của sản phẩm"
        onChange={(e) => handleDescription(e)}
        value={description}
      />
      <InputNumber
        defaultValue={price}
        handleValue={handlePrice}
        labelName="Số tiền sản phẩm"
      />
      {error && <h5>Vui lòng tạo danh mục trước khi tạo sản phẩm</h5>}

      {isLoading && (
        <span className="inline-block bg-primary w-52 h-14 mt-5 rounded-md animate-pulse"></span>
      )}

      {categories && categories.length > 0 && (
        <InputDropDown
          defaultValue={categoryId}
          handleValue={handleCategoryId}
          listValue={categories}
          labelName="Chọn danh mục cho sản phẩm"
        />
      )}
      <InputImageSingle
        isSquare={true}
        labelName="Upload hình đại diện sản phẩm"
        handleFile={handleThumnail}
      />
      <InputImageMultiple
        isSquare={true}
        labelName="Upload hình ảnh của sản phẩm"
        handleMultipleFile={handleListImage}
      />
      <div className="my-3 flex justify-center">
        <button
          className="button-normal"
          type="button"
          onClick={() => HandleUpload()}
        >
          Tạo mới sản phẩm
        </button>
      </div>
    </div>
  );
}

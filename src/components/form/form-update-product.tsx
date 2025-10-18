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
import ButtonDelete from "../button-delete";

interface FormUpdateProductProps {
  id: number;
  link: string;
  nameOld: string;
  thumbnailOld: string;
  descriptionOld: string;
  categoryOld: number;
  priceOld: number;
  imagesUrl: string[];
}

export default function FormUpdateProduct({
  categoryOld,
  id,
  imagesUrl,
  link,
  nameOld,
  thumbnailOld,
  descriptionOld,
  priceOld,
}: FormUpdateProductProps) {
  const [name, setName] = useState<string>(nameOld);
  const [description, setDescription] = useState<string>(descriptionOld);
  const [price, setPrice] = useState<number>(priceOld);
  const [categoryId, setCategoryId] = useState<number>(categoryOld);
  const [thumnail, setThumnail] = useState<File>();
  const [listImageProduct, setListImageProduct] = useState<File[]>();
  const { categories, error, isLoading } = useCategory();
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

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
    formData.append("id", id.toString());
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("categoryId", categoryId.toString());
    listImageProduct.forEach((file) => formData.append("images", file));
    formData.append("thumbnail", thumnail!);
    axios
      .put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const notification: NotificationProps = {
          message: res.data.message,
          type: "success",
        };
        router.push(pathName);
        setNotification(notification);
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

  const handleDelete = (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
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
          router.push("/admin/product");
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

  function UrlToFile(url: string) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "oldImage", { type: blob.type });
        setListImageProduct((val) => {
          if (val && val.length > 0) {
            return [...val, file];
          }
          return [file];
        });
      });
  }
  useEffect(() => {
    imagesUrl.forEach((url) => UrlToFile(url));
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
        labelName="Upload hình đại diện sản phẩm"
        handleFile={handleThumnail}
        oldFile={thumbnailOld}
      />
      <InputImageMultiple
        labelName="Upload hình ảnh của sản phẩm"
        handleMultipleFile={handleListImage}
        listOldImage={imagesUrl}
      />
      <div className="my-3 flex justify-around">
        <button
          className="button-normal"
          type="button"
          onClick={() => HandleUpload()}
        >
          Cập nhật sản phẩm
        </button>
        <ButtonDelete
          buttonName="Xóa sản phẩm"
          contentDelete={`Chắc chắn muốn xóa sản phẩm ${name}`}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

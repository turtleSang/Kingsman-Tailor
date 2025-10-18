import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { log } from "node:console";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface InputImageMultipleProps {
  labelName: string;
  listOldImage?: string[];
  handleMultipleFile: (listFile: File[]) => void;
}

export default function InputImageMultiple({
  labelName,
  listOldImage = [],
  handleMultipleFile,
}: InputImageMultipleProps) {
  const { acceptedFiles, isDragActive, getInputProps, getRootProps } =
    useDropzone({
      accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
      multiple: true,
      maxFiles: 8,
    });
  const [listPreviewImage, setListPreviewImage] = useState<string[]>([]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleMultipleFile(Array.from(acceptedFiles));
      let newListPreview: string[] = [];
      for (const img of acceptedFiles) {
        newListPreview = [URL.createObjectURL(img), ...newListPreview];
      }
      setListPreviewImage(newListPreview);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (listOldImage.length > 0) {
      setListPreviewImage(listOldImage);
    }
  }, []);

  return (
    <div className="mt-2">
      <span>{labelName}</span>
      <div className="grid grid-cols-2 gap-3">
        {listPreviewImage.length > 0 && (
          <div className="grid grid-cols-4 gap-3 border-2 rounded-lg p-3 border-border">
            {listPreviewImage.map((item, index) => {
              return (
                <div className="relative aspect-video" key={index}>
                  <Image src={item} alt="Image of product" fill />
                </div>
              );
            })}
          </div>
        )}
        <div
          className="rounded-lg border-2 border-border cursor-pointer h-full flex items-center justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>Drop the files here ...</div>
          ) : (
            <div className="text-center">
              <span className="block">
                <FontAwesomeIcon icon={faUpload} />
              </span>
              DROP FILE IMAGE HERE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

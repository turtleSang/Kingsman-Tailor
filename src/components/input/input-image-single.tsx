import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function InputImageSingle({
  labelName,
  oldFile,
  handleFile,
}: {
  oldFile?: String;
  labelName: string;
  handleFile: (file: File) => void;
}) {
  const { acceptedFiles, isDragActive, getRootProps, getInputProps } =
    useDropzone({
      multiple: false,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
    });
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

  const setPreviewUrl = (url: string) => {
    setPreviewImageUrl(url);
  };

  const imageToURL = (file: File): string => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    if (oldFile) {
      const url = `${process.env.NEXT_PUBLIC_URL}/${oldFile}`;
      async function UrlToFile(url: string) {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], "oldImage", { type: blob.type });
        handleFile(file);
        setPreviewUrl(imageToURL(file));
      }

      UrlToFile(url);
    }
  }, []);

  useEffect(() => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      handleFile(file);
      const imageUrl = imageToURL(file);
      setPreviewUrl(imageUrl);
    }
  }, [acceptedFiles.length]);

  return (
    <div>
      <span>{labelName}</span>
      <div className="grid grid-cols-2 items-center gap-3">
        {previewImageUrl && (
          <div className="relative aspect-video rounded-md overflow-hidden">
            <Image
              className="z-0"
              src={previewImageUrl}
              fill={true}
              alt="Upload Image"
            />
          </div>
        )}
        <div
          className="mt-2  rounded-lg border-2 border-border cursor-pointer h-full flex items-center justify-center"
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

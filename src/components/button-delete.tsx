"use client";

import { useState } from "react";
import Modal from "./modal/modal";
import Loading from "./loading";
import Notification, { NotificationProps } from "./notification";

export interface ButtonDeleteProps {
  buttonName: string;
  handleDelete: (
    closeLoading?: () => void,
    handleNotification?: (notification: NotificationProps) => void
  ) => void;
  contentDelete: string;
}

export default function ButtonDelete({
  buttonName,
  contentDelete,
  handleDelete,
}: ButtonDeleteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const closeLoading = () => {
    setIsLoading(false);
  };

  const handleNotification = (notification: NotificationProps) => {
    setNotification(notification);
  };

  return (
    <Modal
      buttonProps={{
        className: "button-outline",
      }}
      buttonTxt={buttonName}
      data={
        <div className="relative min-h-64">
          {isLoading && <Loading />}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <h3 className="text-center mt-5">{contentDelete}</h3>
          <div className="flex justify-center items-center mt-10">
            <button
              className="button-normal"
              onClick={() => {
                setIsLoading(true);
                handleDelete(closeLoading, handleNotification);
              }}
            >
              {buttonName}
            </button>
          </div>
        </div>
      }
    />
  );
}

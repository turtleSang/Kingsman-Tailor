import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamationCircle,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning";
}

const styleBgNofication = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-600",
};

const styleTextNofication = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
};

const icon = {
  success: faCheck,
  error: faTriangleExclamation,
  warning: faExclamationCircle,
};

export default function Notification({ message, type }: NotificationProps) {
  return (
    <div className="text-center">
      <span className={clsx(styleBgNofication[type], "p-3 rounded-md")}>
        <FontAwesomeIcon className="mr-3" icon={icon[type]} />
        {message}
      </span>
    </div>
  );
}

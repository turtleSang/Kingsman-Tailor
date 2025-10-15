import { InputHTMLAttributes } from "react";

export default function InputText({
  lableName,
  ...props
}: {
  lableName: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span>{lableName}</span>
      <input className="input-text" {...props} />
    </label>
  );
}

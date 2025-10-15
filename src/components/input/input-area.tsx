import { TextareaHTMLAttributes } from "react";

export default function InputArea({
  lableName,
  ...props
}: { lableName: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label htmlFor="">
      <span>{lableName}</span>
      <textarea className="input-area" rows={2} cols={50} {...props}></textarea>
    </label>
  );
}

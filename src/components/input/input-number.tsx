import { FormEvent, useState } from "react";
import { formatCurrency, parseCurrency } from "../../../libs/helper-client";

interface InputNumberProps {
  labelName: string;
  defaultValue: number;
  handleValue: (number: number) => void;
}

export default function InputNumber({
  defaultValue,
  handleValue,
  labelName,
}: InputNumberProps) {
  const [txtNumber, setTxtNumber] = useState<string>(
    formatCurrency(defaultValue)
  );

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const number = parseCurrency(event.currentTarget.value);
    if (number > 0) {
      setTxtNumber(formatCurrency(number));
    } else if (isNaN(number)) {
      setTxtNumber("0");
    } else {
      setTxtNumber(txtNumber);
    }
    handleValue(number);
  };

  return (
    <label>
      <span>{labelName}</span>
      <input
        className="input-text "
        value={txtNumber}
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
}

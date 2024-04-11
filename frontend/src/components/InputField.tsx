import { ChangeEvent } from "react";

interface InputFieldType {
  placeholder: string;
  label: string;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  placeholder,
  label,
  type,
  name,
  onChange,
}: InputFieldType) {
  return (
    <>
      <label className="font-semibold">{label}</label>
      <input
        className="text-slate-400 border-[1px] border-slate-200 border-solid p-2 rounded-lg outline-blue-500"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        required
      />
    </>
  );
}

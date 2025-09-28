"use client";

import type { Icon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type InputHTMLAttributes, useId } from "react";
import { FormLabel } from "./label";

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  asChild?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;
  label: string;
  required?: boolean;
  placeholder?: string;
  details?: string;
  errorMessage?: string;
  type?: HTMLInputProps["type"];
  inputSize?: "md" | "sm";
  inputProps?: HTMLInputProps;
};

export function FormInput({
  asChild = false,
  leftIcon,
  rightIcon,
  inputSize = "md",
  label,
  placeholder,
  type = "text",
  details,
  errorMessage,
  required = false,
  inputProps,
}: Props) {
  const Input = asChild ? Slot : "input";
  const inputId = useId();
  const detailsId = useId();

  return (
    <div>
      <FormLabel
        htmlFor={inputId}
        required={required}
        labelSize={inputSize}
        className="block mb-1"
      >
        {label}
      </FormLabel>

      <label
        htmlFor={inputId}
        className={clsx(
          "px-6 py-2 rounded-3xl bg-black/5 border border-black/3",
          "flex items-start gap-2.5 transition-all will-change-[shadow] duration-100",
          "ring-0 ring-primary-600/40 focus-within:ring-4",
        )}
      >
        {leftIcon && <InputIcon icon={leftIcon} />}

        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className="outline-none flex-1 leading-tight"
          aria-describedby={details && detailsId}
          {...inputProps}
        />

        {rightIcon && <InputIcon icon={rightIcon} />}
      </label>

      {details && (
        <p id={detailsId} className="text-gray-900 text-sm my-1 mb-0 p-0">
          {details}
        </p>
      )}

      {errorMessage && (
        <p className="text-red-300 text-sm my-1 mb-0 p-0">{errorMessage}</p>
      )}
    </div>
  );
}

type InputIconProps = {
  icon: Icon;
};

function InputIcon({ icon: I }: InputIconProps) {
  return <I size={20} weight="fill" className="text-gray-600" />;
}

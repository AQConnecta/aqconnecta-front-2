"use client";

import type { Icon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type InputHTMLAttributes, type ReactElement, useId } from "react";
import { InputIcon } from "./input-icon";
import { FormLabel } from "./label";

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  asChild?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
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
  rightComponent,
  leftComponent,
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

  if ((rightComponent && rightIcon) || (leftComponent && leftIcon)) {
    throw new Error(
      "FormInput can only receive either {left, right} icon or component, never both at the same time.",
    );
  }

  return (
    <div>
      <FormLabel htmlFor={inputId} required={required} className="block mb-1">
        {label}
      </FormLabel>

      <label
        htmlFor={inputId}
        className={clsx(
          "px-6 py-2 rounded-3xl bg-black/5 border border-black/3",
          "flex items-start gap-2.5 transition-all will-change-[shadow] duration-100",
          "ring-0 ring-primary-600/40 focus-within:ring-4",
          "max-small-width:text-sm",
        )}
      >
        {leftIcon && <InputIcon icon={leftIcon} />}
        {leftComponent ?? null}

        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "outline-none w-full small-width:leading-tight max-small-width:leading-4",
            "text-wrap placeholder:text-ellipsis",
          )}
          aria-describedby={details && detailsId}
          {...inputProps}
        />

        {rightIcon && <InputIcon icon={rightIcon} />}
        {rightComponent ?? null}
      </label>

      {details && (
        <p id={detailsId} className="text-gray-900 text-sm my-1 mb-0 p-0">
          {details}
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm my-1 mb-0 p-0">{errorMessage}</p>
      )}
    </div>
  );
}

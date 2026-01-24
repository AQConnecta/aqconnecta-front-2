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
  hideLabel?: boolean;
  required?: boolean;
  placeholder?: string;
  details?: string;
  errorMessage?: string;
  type?: HTMLInputProps["type"];
  inputSize?: "md" | "sm";
  inputProps?: HTMLInputProps;
  className?: string;
};

export function FormInput({
  asChild = false,
  leftIcon,
  rightIcon,
  rightComponent,
  leftComponent,
  label,
  hideLabel = false,
  placeholder,
  type = "text",
  details,
  errorMessage,
  required = false,
  inputProps,
  className,
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
    <div className={className}>
      <FormLabel
        htmlFor={inputId}
        required={required}
        className={clsx("block mb-1", hideLabel && "sr-only")}
      >
        {label}
      </FormLabel>

      <div
        className={clsx(
          "flex items-start gap-2.5 w-full rounded-md px-3 text-sm max-small-width:text-sm",
          "transition-[color,box-shadow] outline-none bg-gray-100",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "ring-0 ring-primary-600/40 focus-within:ring-4 aria-invalid:ring-red-500/20",
          "has-autofill:bg-primary-200",
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
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "file:text-foreground placeholder:text-gray-500",
            "text-wrap placeholder:text-ellipsis min-h-9",
            "autofill:bg-primary-200 shadow-primary-200 autofill:shadow-[inset_0_0_0px_1000px_var(--tw-shadow-color)]",
            "autofill:[-webkit-text-fill-color:var(--color-primary-600)] autofill:font-medium",
          )}
          aria-describedby={details && detailsId}
          {...inputProps}
        />

        {rightIcon && <InputIcon icon={rightIcon} />}
        {rightComponent ?? null}
      </div>

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

"use client";

import type { Icon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";
import { FormErrorMessage } from "./error-message";
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
  children?: ReactNode;
  inputWrapperClassname?: string;
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
  children,
  inputWrapperClassname,
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
          "input-wrapper gap-2.5 has-autofill:bg-primary-200",
          inputWrapperClassname,
        )}
      >
        {leftIcon && <InputIcon icon={leftIcon} />}
        {leftComponent ?? null}

        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "input-inner",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "file:text-foreground placeholder:text-gray-500",
            "autofill:bg-primary-200 shadow-primary-200 autofill:shadow-[inset_0_0_0px_1000px_var(--tw-shadow-color)]",
            "autofill:[-webkit-text-fill-color:var(--color-primary-600)] autofill:font-medium",
          )}
          aria-describedby={details && detailsId}
          {...inputProps}
        >
          {children}
        </Input>

        {rightIcon && <InputIcon icon={rightIcon} />}
        {rightComponent ?? null}
      </div>

      {details && (
        <p id={detailsId} className="text-gray-900 text-sm my-1 mb-0 p-0">
          {details}
        </p>
      )}

      <FormErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

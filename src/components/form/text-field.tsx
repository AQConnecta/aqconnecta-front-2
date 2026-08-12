"use client";

import type { Icon } from "@phosphor-icons/react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type InputHTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";
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

export function FormTextField({
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

      <FormTextField.Root className={inputWrapperClassname}>
        {leftIcon && <InputIcon icon={leftIcon} />}
        {leftComponent ?? null}

        <FormTextField.Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          aria-describedby={details && detailsId}
          asChild={asChild}
          {...inputProps}
        >
          {children}
        </FormTextField.Input>

        {rightIcon && <InputIcon icon={rightIcon} />}
        {rightComponent ?? null}
      </FormTextField.Root>

      {details && <FormTextField.Details id={detailsId} content={details} />}
      {errorMessage && <FormTextField.ErrorMessage message={errorMessage} />}
    </div>
  );
}

/**
 * @example
 * ```ts
 * <div>
 *    <Form.Label />
 *    <Form.TextField.Root>
 *      <Form.InputIcon />
 *
 *      {
 *        // some other components such as buttons, if needed
 *      }
 *
 *      <Form.TextField.Input />
 *
 *      <Form.InputIcon />
 *
 *      {
 *        // some other components such as buttons, if needed
 *      }
 *    </Form.TextField.Root>
 *
 *    <FormTextField.Details />
 *    <FormTextField.ErrorMessage />}
 * </div>
 *  ```
 */
export namespace FormTextField {
  type RootProps = PropsWithChildren<{
    className?: string;
  }>;

  export function Root({ className, children }: RootProps) {
    return (
      <div
        className={clsx(
          "input-wrapper gap-2.5 has-autofill:bg-primary-200",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  type InputProps = { detailsId?: string; asChild?: boolean } & HTMLInputProps;

  export function Input({
    detailsId,
    className,
    asChild = false,
    ...props
  }: InputProps) {
    const Element = asChild ? Slot : "input";
    return (
      <Element
        {...props}
        className={clsx(
          "input-inner",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "file:text-foreground placeholder:text-gray-500",
          "autofill:bg-primary-200 shadow-primary-200 autofill:shadow-[inset_0_0_0px_1000px_var(--tw-shadow-color)]",
          "autofill:[-webkit-text-fill-color:var(--color-primary-600)] autofill:font-medium",
          className,
        )}
        aria-describedby={detailsId}
      />
    );
  }

  type DetailsProps = {
    content: string;
    id: string;
  };

  export function Details({ content, id }: DetailsProps) {
    return (
      <p id={id} className="text-gray-900 text-sm my-1 mb-0 p-0">
        {content}
      </p>
    );
  }

  type ErrorMessageProps = {
    message: string;
  };

  export function ErrorMessage({ message }: ErrorMessageProps) {
    return <p className="text-red-500 text-sm my-1 mb-0 p-0">{message}</p>;
  }
}

import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

type Props = {
  labelSize: "md" | "sm";
  required: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel({
  labelSize,
  children,
  className,
  htmlFor,
  required,
  ...props
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "font-medium text-foreground",
        labelSize === "md" && "text-lg",
        labelSize === "sm" && "text-base",
        className && className,
      )}
      {...props}
    >
      {children}
      {!required && (
        <span className="ml-1 text-xs text-gray-600 font-medium align-super">
          (opcional)
        </span>
      )}
    </label>
  );
}

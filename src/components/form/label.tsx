import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

type Props = {
  required: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel({
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
        "font-medium text-foreground max-small-width:text-base small-width:text-lg",
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

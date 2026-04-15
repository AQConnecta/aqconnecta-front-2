"use client";

import { Switch as S } from "@base-ui/react";
import clsx from "clsx";

export function Switch({ className, ...props }: S.Root.Props) {
  return (
    <S.Root
      {...props}
      className={clsx(
        "group relative flex items-center p-0.75 w-12.5 h-min border border-black/3 rounded-full",
        "transition-colors duration-150",
        "bg-black/5 hover:bg-black/10 data-checked:bg-primary-600 data-checked:hover:bg-primary-700",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
    >
      <S.Thumb
        className={clsx(
          "block w-7.5 h-5 rounded-full transition-all duration-150 ease-in-out",
          "translate-x-0 data-checked:translate-x-3",
          "bg-gray-300 not-data-disabled:not-data-readonly:group-hover:data-unchecked:bg-gray-350",
          "not-data-readonly:data-checked:bg-primary-200 not-data-readonly:data-checked:group-hover:bg-primary-200/90",
          "data-disabled:bg-gray-200 data-readonly:bg-gray-300",
        )}
      />
    </S.Root>
  );
}

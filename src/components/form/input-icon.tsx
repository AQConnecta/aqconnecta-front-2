import { deprecate } from "node:util";
import type { Icon, IconProps } from "@phosphor-icons/react";
import clsx from "clsx";

type Props = {
  icon: Icon;
} & IconProps;

export const InputIcon = deprecate(
  ({ icon: I, className, weight = "fill", ...props }: Props) => {
    return (
      <I
        {...props}
        weight={weight}
        className={clsx(
          "shrink-0 text-gray-600 small-width:size-5 max-small-width:size-4 my-2",
          className,
        )}
      />
    );
  },
  "`InputIcon` is deprecated and will be removed soon. Use `TextField` instead.",
  "INPUT_ICON_DEPRECATED",
);

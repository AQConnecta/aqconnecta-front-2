import { Avatar, type AvatarImageProps } from "@base-ui/react/avatar";
import clsx from "clsx";

type Props = AvatarImageProps;

export function AvatarImage({ className, ...props }: Props) {
  return (
    <Avatar.Image
      className={clsx("aspect-square size-full", className)}
      {...props}
    />
  );
}

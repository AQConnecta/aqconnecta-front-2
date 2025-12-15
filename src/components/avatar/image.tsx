import { type AvatarImageProps, Image } from "@radix-ui/react-avatar";
import clsx from "clsx";

type Props = AvatarImageProps;

export function AvatarImage({ className, ...props }: Props) {
  return (
    <Image className={clsx("aspect-square size-full", className)} {...props} />
  );
}

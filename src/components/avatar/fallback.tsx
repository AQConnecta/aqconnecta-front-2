import { Avatar, type AvatarFallbackProps } from "@base-ui/react/avatar";
import clsx from "clsx";

type Props = AvatarFallbackProps & { name?: string };

export function AvatarFallback({ className, children, name, ...props }: Props) {
  const initials = (() => {
    if (!name) return undefined;
    const { 0: firstName, 1: secondName, length } = name.split(" ");
    if (length === 0) return undefined;
    if (length === 1) return firstName[0];
    return firstName[0] + secondName[0];
  })();

  return (
    <Avatar.Fallback
      data-slot="avatar-fallback"
      className={clsx(
        "flex size-full items-center justify-center rounded-full",
        "bg-linear-to-br from-primary-700 to-purple-300 text-white",
        className,
      )}
      {...props}
    >
      {children ?? initials}
    </Avatar.Fallback>
  );
}

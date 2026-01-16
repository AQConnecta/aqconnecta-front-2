import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Slot } from "@radix-ui/react-slot";

type Props = DialogPrimitive.Trigger.Props & {
  asChild?: boolean;
};

export function DialogTrigger({ asChild, children, ...props }: Props) {
  if (asChild) {
    return (
      <DialogPrimitive.Trigger
        render={(props) => <Slot {...props}>{children}</Slot>}
      />
    );
  }

  return (
    <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
  );
}

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Slot } from "@radix-ui/react-slot";

type Props = Omit<DialogPrimitive.Close.Props, "render"> & {
  asChild?: boolean;
};

export function DialogClose({ asChild, ...props }: Props) {
  if (asChild) {
    return (
      <DialogPrimitive.Close
        {...props}
        render={(primitiveProps) => <Slot {...primitiveProps} />}
      />
    );
  }

  return <DialogPrimitive.Close {...props} />;
}

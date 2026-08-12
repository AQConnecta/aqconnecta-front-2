import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Slot } from "@radix-ui/react-slot";

type Props = Omit<PopoverPrimitive.Close.Props, "render"> & {
  asChild?: boolean;
};

export function PopoverClose({ asChild, ...props }: Props) {
  if (asChild) {
    return (
      <PopoverPrimitive.Close
        {...props}
        render={(primitiveProps) => <Slot {...primitiveProps} />}
      />
    );
  }

  return <PopoverPrimitive.Close {...props} />;
}

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Slot } from "@radix-ui/react-slot";

type Props = PopoverPrimitive.Trigger.Props & { asChild?: boolean };

export function PopoverTrigger({ children, asChild = false, ...props }: Props) {
  if (asChild) {
    return (
      <PopoverPrimitive.Trigger
        render={(props) => <Slot {...props}>{children}</Slot>}
      />
    );
  }

  return (
    <PopoverPrimitive.Trigger {...props}>{children}</PopoverPrimitive.Trigger>
  );
}

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { DialogClose } from "./close";
import { DialogContainer } from "./container";
import { DialogHeader } from "./header";
import { DialogTrigger } from "./trigger";

export default {
  Root: DialogPrimitive.Root,
  Trigger: DialogTrigger,
  Container: DialogContainer,
  Header: DialogHeader,
  Close: DialogClose,
  Description: DialogPrimitive.Description,
};

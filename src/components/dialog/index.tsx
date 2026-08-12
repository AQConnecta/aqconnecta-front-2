import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { DialogActionsContainer } from "./actions-container";
import { DialogClose } from "./close";
import { DialogContainer } from "./container";
import { DialogHeader } from "./header";
import { DialogTrigger } from "./trigger";

export const DIALOG_CLOSE_ANIMATION_DURATION_MS = 200;

export default {
  Root: DialogPrimitive.Root,
  Trigger: DialogTrigger,
  Container: DialogContainer,
  Header: DialogHeader,
  Close: DialogClose,
  Description: DialogPrimitive.Description,
  ActionsContainer: DialogActionsContainer,
};

"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { PopoverContent } from "./content";
import { PopoverHeader } from "./header";
import { PopoverTrigger } from "./trigger";

export default {
  Root: PopoverPrimitive.Root,
  Content: PopoverContent,
  Description: PopoverPrimitive.Description,
  Header: PopoverHeader,
  Trigger: PopoverTrigger,
};

import { Combobox } from "@base-ui/react";
import { ComboboxContent } from "./content";
import { ComboboxInput } from "./input";
import { ComboboxItem } from "./item";
import { ComboboxVirtualizerListWrapper } from "./virtualizer-list-wrapper";

const {
  Input: _input,
  Portal: _portal,
  Group: _group,
  Positioner: _positioner,
  Popup: _popup,
  Item: _item,
  ...combobox
} = Combobox;

export default {
  ...combobox,
  Input: ComboboxInput,
  Content: ComboboxContent,
  Item: ComboboxItem,
  VirtualizerListWrapper: ComboboxVirtualizerListWrapper,
};

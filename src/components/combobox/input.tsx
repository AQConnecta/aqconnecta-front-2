import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import clsx from "clsx";
import IconButton from "../icon-button";

type Props = Omit<Combobox.Input.Props, "children"> & {
  triggerLabel?: string;
};

export function ComboboxInput({
  triggerLabel = "Abrir seleção",
  className,
  id,
  ...props
}: Props) {
  return (
    <Combobox.InputGroup className="input-wrapper">
      <Combobox.Input
        {...props}
        className={clsx("input-inner", className)}
        id={id}
      />
      <div className="flex items-stretch justify-end text-gray-600">
        <Combobox.Clear
          className="combobox-clear flex h-10 w-fit items-center justify-center rounded bg-transparent p-0"
          title="Limpar tudo"
          render={({ children: _, color: _color, ...props }) => (
            <IconButton.Root
              {...props}
              size="sm"
              type="button"
              className="place-self-center"
            >
              <IconButton.Icon icon={TrashIcon} weight="bold" />
              <IconButton.Label>Limpar tudo</IconButton.Label>
            </IconButton.Root>
          )}
        ></Combobox.Clear>
        <Combobox.Trigger aria-label={triggerLabel}>
          <CaretDownIcon className="size-4" weight="bold" />
        </Combobox.Trigger>
      </div>
    </Combobox.InputGroup>
  );
}

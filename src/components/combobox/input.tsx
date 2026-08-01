import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";

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
          className="combobox-clear flex h-10 w-6 items-center justify-center rounded bg-transparent p-0"
          aria-label="Limpar seleção"
        >
          <XIcon className="size-4" weight="bold" />
        </Combobox.Clear>
        <Combobox.Trigger aria-label={triggerLabel}>
          <CaretDownIcon className="size-4" weight="bold" />
        </Combobox.Trigger>
      </div>
    </Combobox.InputGroup>
  );
}

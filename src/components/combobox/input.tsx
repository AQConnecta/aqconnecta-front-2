import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import Form from "../form";

type Props = Omit<Combobox.Input.Props, "children"> & {
  label?: string;
  triggerLabel?: string;
};

export function ComboboxInput({
  triggerLabel = "Abrir seleção",
  className,
  label,
  id,
  ...props
}: Props) {
  return (
    <ComboboxInputLabelWrapper label={label} comboboxId={id}>
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
    </ComboboxInputLabelWrapper>
  );
}

function ComboboxInputLabelWrapper({
  comboboxId,
  label,
  children,
}: PropsWithChildren<{ comboboxId?: string; label?: string }>) {
  if (!label) return children;

  return (
    <div className="relative flex flex-col gap-1 text-sm leading-5 font-medium text-gray-900">
      <Form.Label required htmlFor={comboboxId}>
        {label}
      </Form.Label>

      {children}
    </div>
  );
}

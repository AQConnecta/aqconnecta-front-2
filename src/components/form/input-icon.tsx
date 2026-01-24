import type { Icon } from "@phosphor-icons/react";

type Props = {
  icon: Icon;
};

export function InputIcon({ icon: I }: Props) {
  return (
    <I
      weight="fill"
      className="shrink-0 text-gray-600 small-width:size-5 max-small-width:size-4 my-2"
    />
  );
}

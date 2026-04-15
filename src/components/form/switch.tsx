import type { Switch as S } from "@base-ui/react";
import { useId } from "react";
import { Switch } from "../switch";
import { FormLabel } from "./label";

type Props = {
  label?: string;
} & S.Root.Props;

export function FormSwitch({ label, id, ...props }: Props) {
  const switchId = useId();
  const resolvedSwitchId = id ?? switchId;

  if (!label) return <Switch id={resolvedSwitchId} {...props} />;

  return (
    <FormLabel
      required
      htmlFor={resolvedSwitchId}
      className="flex items-center gap-2 font-medium"
    >
      <Switch id={resolvedSwitchId} />
      <span>{label}</span>
    </FormLabel>
  );
}

import type { Switch as S } from "@base-ui/react";
import { useId } from "react";
import { Switch } from "../switch";
import { FormErrorMessage } from "./error-message";
import { FormLabel } from "./label";

type Props = {
  label?: string;
  errorMessage?: string;
} & S.Root.Props;

export function FormSwitch({ label, id, errorMessage, ...props }: Props) {
  const switchId = useId();
  const resolvedSwitchId = id ?? switchId;

  if (!label) return <Switch id={resolvedSwitchId} {...props} />;

  return (
    <div>
      <FormLabel
        required
        htmlFor={resolvedSwitchId}
        className="flex items-center gap-2 font-medium"
      >
        <Switch id={resolvedSwitchId} {...props} />
        <span>{label}</span>
      </FormLabel>
      <FormErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

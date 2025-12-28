import type { Icon } from "@phosphor-icons/react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle";
import type { ReactElement } from "react";
import { AlertContainer } from "./container";
import type { AlertVariantsProps } from "./variants";

type Props = AlertVariantsProps & {
  className?: string;
  title?: string;
  /**
   * Alert's content. If `string`, becomes a paragraph (`p`) element.
   */
  content?: string | ReactElement;
  icon?: Icon;
};

export function Alert({ title, content, icon, variant }: Props) {
  const contentElement =
    typeof content === "string" ? <p>{content}</p> : content;

  const I = resolveIcon({ icon, variant });

  return (
    <AlertContainer variant={variant}>
      <I size={16} className="my-0.5 min-w-4" />
      <div className="flex flex-col gap-1 items-start">
        {title && (
          <header className="min-h-4 tracking-tight">
            <span className="font-semibold">{title}</span>
          </header>
        )}
        {contentElement}
      </div>
    </AlertContainer>
  );
}

type ResolveIconArgs = { icon?: Icon; variant: AlertVariantsProps["variant"] };

function resolveIcon({ variant, icon }: ResolveIconArgs) {
  if (icon) return icon;

  switch (variant) {
    case "danger":
      return WarningIcon;
    default:
      return WarningCircleIcon;
  }
}

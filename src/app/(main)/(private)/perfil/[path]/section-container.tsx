import type { Icon } from "@phosphor-icons/react";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import type { MouseEventHandler, ReactNode } from "react";
import { Heading } from "@/components/heading";
import IconButton from "@/components/icon-button";

type Props = {
  children: ReactNode;
  shouldShowEditButton: boolean;
  icon: Icon;
  title: string;
  onEditButtonClick?: MouseEventHandler<HTMLButtonElement>;
};

export function SectionContainer({
  children,
  shouldShowEditButton,
  icon: I,
  title,
  onEditButtonClick,
}: Props) {
  return (
    <section className="card">
      <header className="flex items-center gap-2 mb-4">
        <I size={20} weight="bold" />
        <Heading level={3} as="h2">
          {title}
        </Heading>

        {shouldShowEditButton && (
          <IconButton.Root
            className="ml-auto"
            color="foreground"
            onClick={onEditButtonClick}
          >
            <IconButton.Icon icon={PencilIcon} weight="fill" />
            <IconButton.Label>Adicione novas competências</IconButton.Label>
          </IconButton.Root>
        )}
      </header>
      {children}
    </section>
  );
}

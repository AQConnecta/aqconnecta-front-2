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
  editButtonLabel: string;
};

export function SectionContainer({
  children,
  shouldShowEditButton,
  icon: I,
  title,
  onEditButtonClick,
  editButtonLabel,
}: Props) {
  return (
    <section className="card">
      <header className="flex items-center gap-2 mb-4">
        <I size={20} weight="bold" />
        <Heading level={3} as="h2">
          {title}
        </Heading>

        {shouldShowEditButton && (
          <SectionContainerEditButton
            editButtonLabel={editButtonLabel}
            onEditButtonClick={onEditButtonClick}
          />
        )}
      </header>
      {children}
    </section>
  );
}

type EditButtonProps = {
  onEditButtonClick?: MouseEventHandler<HTMLButtonElement>;
  editButtonLabel: string;
};

export function SectionContainerEditButton({
  editButtonLabel,
  onEditButtonClick,
}: EditButtonProps) {
  return (
    <IconButton.Root
      className="ml-auto"
      color="foreground"
      onClick={onEditButtonClick}
      title={editButtonLabel}
    >
      <IconButton.Icon icon={PencilIcon} weight="fill" />
      <IconButton.Label>{editButtonLabel}</IconButton.Label>
    </IconButton.Root>
  );
}

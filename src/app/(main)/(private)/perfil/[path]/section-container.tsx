import type { Icon } from "@phosphor-icons/react";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Heading } from "@/components/heading";
import IconButton from "@/components/icon-button";

type Props = {
  children: ReactNode;
  icon: Icon;
  title: string;
  actionContent?: ReactNode;
  shouldShowEditButton: boolean;
};

export function SectionContainer({
  children,
  shouldShowEditButton,
  icon: I,
  title,
  actionContent,
}: Props) {
  return (
    <section className="card">
      <header className="flex items-center gap-2 mb-4">
        <I size={20} weight="bold" />
        <Heading level={3} as="h2">
          {title}
        </Heading>

        {shouldShowEditButton && actionContent && (
          <div className="ml-auto flex items-center gap-2 justify-end">
            {actionContent}
          </div>
        )}
      </header>
      {children}
    </section>
  );
}

export namespace SectionContainer {
  type EditButtonProps = {
    editButtonLabel: string;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

  export function EditButton({ editButtonLabel, ...props }: EditButtonProps) {
    return (
      <IconButton.Root
        {...props}
        className="ml-auto"
        color="foreground"
        title={editButtonLabel}
      >
        <IconButton.Icon icon={PencilIcon} weight="fill" />
        <IconButton.Label>{editButtonLabel}</IconButton.Label>
      </IconButton.Root>
    );
  }

  type AddButtonProps = {
    onAddButtonClick?: MouseEventHandler<HTMLButtonElement>;
    addButtonLabel: string;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

  export function AddButton({ addButtonLabel, ...props }: AddButtonProps) {
    return (
      <IconButton.Root
        {...props}
        className="ml-auto"
        color="foreground"
        title={addButtonLabel}
      >
        <IconButton.Icon icon={PlusIcon} weight="bold" />
        <IconButton.Label>{addButtonLabel}</IconButton.Label>
      </IconButton.Root>
    );
  }
}

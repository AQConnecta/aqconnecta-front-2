"use client";

import { EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import type { Dispatch, SetStateAction } from "react";
import Form from "@/components/form";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

export function TogglePasswordVisibilityButton({
  isVisible,
  setIsVisible,
}: Props) {
  const icon = isVisible ? EyeIcon : EyeSlashIcon;
  const toggle = () => setIsVisible((prev) => !prev);
  return (
    <button
      type="button"
      onClick={toggle}
      className="outline-none ring-0 ring-primary-300 focus:ring-4 rounded-full transition-all duration-200"
    >
      <Form.InputIcon icon={icon} />
    </button>
  );
}

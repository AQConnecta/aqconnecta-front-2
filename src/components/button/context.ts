import { createContext } from "react";
import type { ButtonVariantsProps } from "./variants";

type ButtonContextValue = {
  [K in keyof ButtonVariantsProps]-?: Required<ButtonVariantsProps[K]>;
};

export const ButtonContext = createContext<ButtonContextValue>(
  {} as ButtonContextValue,
);

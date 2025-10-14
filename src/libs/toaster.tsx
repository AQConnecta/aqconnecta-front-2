"use client";

import type { PropsWithChildren } from "react";
import { type Toast, ToastBar, Toaster } from "react-hot-toast";

export function ToasterProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster position="top-center">{CustomToastBar}</Toaster>
    </>
  );
}

function CustomToastBar(t: Toast) {
  const background = (() => {
    switch (t.type) {
      case "blank":
      case "loading":
      case "custom":
      case "success":
        return "var(--color-primary-600)";
      case "error":
        return "var(--color-red-100)";
    }
  })();

  const color = (() => {
    switch (t.type) {
      case "blank":
      case "loading":
      case "custom":
      case "success":
        return "var(--color-primary-200)";
      case "error":
        return "var(--color-red-300)";
    }
  })();

  return (
    <ToastBar
      toast={t}
      style={{
        background,
        borderRadius: "calc(var(--spacing) * 3)",
        fontWeight: "var(--font-weight-bold)",
        color,
      }}
    ></ToastBar>
  );
}

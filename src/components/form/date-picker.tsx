"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import * as React from "react";
import { useEffect, useEffectEvent, useMemo } from "react";
import Popover from "@/components/popover";
import { Calendar } from "../calendar";
import IconButton from "../icon-button";
import { FormErrorMessage } from "./error-message";
import { FormLabel } from "./label";

function formatDate(date: Date | undefined) {
  if (!date || !isValidDate(date)) return "";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function parseDateBR(dateString: string): Date | undefined {
  if (!dateString) return undefined;

  const parts = dateString.split("/");

  if (parts.length !== 3) return undefined;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return undefined;
  }

  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  ) {
    return parsedDate;
  }

  return undefined;
}

/**
 * Validates and parses external date (coming through `value` property).
 */
function toSafeExternalDate(
  value: Date | string | undefined,
): Date | undefined {
  if (isValidDate(value)) return value;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const parsed = new Date(value);
    if (isValidDate(parsed)) return parsed;
  }

  return undefined;
}

function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !Number.isNaN(new Date(date).getTime());
}

type Props = {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onDateChange?: (date: Date | string | undefined) => void;
  ref?: React.RefCallback<HTMLInputElement>;
  value?: Date | string;
};

const today = formatDate(new Date());

export function FormDatePickerInput({
  name,
  required = false,
  className,
  label,
  placeholder = today,
  errorMessage,
  onBlur,
  onDateChange,
  ref,
  disabled,
  value,
}: Props) {
  const dataPickerId = React.useId();
  const safeValue = useMemo(() => toSafeExternalDate(value), [value]);

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(safeValue);
  const [inputValue, setInputValue] = React.useState(
    safeValue ? formatDate(safeValue) : ((value as string | undefined) ?? ""),
  );

  const lastEmittedRef = React.useRef<Date | string | undefined>(value);

  const emit = (next: Date | string | undefined) => {
    lastEmittedRef.current = next;
    onDateChange?.(next);
  };

  const maybeUpdateDateDueToExternalChange = useEffectEvent(
    (
      externalValue: Date | string | undefined,
      resolvedDate: Date | undefined,
    ) => {
      if (resolvedDate) {
        setInputValue(formatDate(resolvedDate));
        setMonth(resolvedDate);
      } else if (externalValue === undefined) {
        setInputValue("");
      } else if (typeof externalValue === "string") {
        setInputValue(externalValue);
      }
    },
  );

  useEffect(() => {
    const isEcho =
      value === lastEmittedRef.current ||
      (isValidDate(value) &&
        isValidDate(lastEmittedRef.current) &&
        value.getTime() === (lastEmittedRef.current as Date).getTime());

    if (isEcho) return;

    lastEmittedRef.current = value;
    maybeUpdateDateDueToExternalChange(value, safeValue);
  }, [value, safeValue]);

  return (
    <div className={className}>
      <FormLabel
        htmlFor={dataPickerId}
        required={required}
        className="block mb-1"
      >
        {label}
      </FormLabel>

      <div className="input-wrapper gap-2.5 has-autofill:bg-primary-200">
        <input
          name={name}
          id={dataPickerId}
          value={inputValue}
          placeholder={placeholder}
          className="input-inner"
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          onChange={(e) => {
            const rawDate = e.currentTarget.value;
            setInputValue(e.target.value);

            const parsedDate = parseDateBR(rawDate);

            if (parsedDate) {
              emit(parsedDate);
              setMonth(parsedDate);
            } else {
              emit(rawDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild disabled={disabled}>
            <IconButton.Root
              id="date-picker"
              variant="ghost"
              size="sm"
              aria-label="Select date"
              className="self-center"
            >
              <IconButton.Icon icon={CalendarIcon} />
              <IconButton.Label>Selecione uma data</IconButton.Label>
            </IconButton.Root>
          </Popover.Trigger>
          <Popover.Content
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              disabled={disabled}
              mode="single"
              selected={safeValue}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setInputValue(formatDate(date));
                emit(date);
                setOpen(false);
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>

      <FormErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

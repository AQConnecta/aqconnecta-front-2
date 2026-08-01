"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import * as React from "react";
import { useEffect } from "react";
import Popover from "@/components/popover";
import { Calendar } from "../calendar";
import IconButton from "../icon-button";
import { FormErrorMessage } from "./error-message";
import { FormLabel } from "./label";

function formatDate(date: Date | undefined) {
  if (!date) return "";

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

function isValidDate(date: Date | undefined) {
  return !!date && !Number.isNaN(date.getTime());
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
  onDateChange?: (date: Date | undefined) => void;
  ref?: React.RefCallback<HTMLInputElement>;
  value?: Date;
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
  const resolvedDataPickerId = dataPickerId;

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  const maybeUpdateDateDueToValueChange = React.useEffectEvent(
    (newDate: Date | undefined) => {
      const currentParsedDate = parseDateBR(inputValue);

      if (newDate?.getTime() !== currentParsedDate?.getTime()) {
        setInputValue(formatDate(newDate));
      }

      if (isValidDate(newDate)) {
        setMonth(newDate);
      }
    },
  );

  useEffect(() => {
    maybeUpdateDateDueToValueChange(value);
  }, [value]);

  return (
    <div className={className}>
      <FormLabel
        htmlFor={resolvedDataPickerId}
        required={required}
        className="block mb-1"
      >
        {label}
      </FormLabel>

      <div className="input-wrapper gap-2.5 has-autofill:bg-primary-200">
        <input
          name={name}
          id={resolvedDataPickerId}
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
            onDateChange?.(parsedDate);

            if (isValidDate(parsedDate)) setMonth(parsedDate);
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
              selected={value}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setInputValue(formatDate(date));
                onDateChange?.(date);
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

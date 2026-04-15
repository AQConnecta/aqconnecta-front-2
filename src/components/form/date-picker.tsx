"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import * as React from "react";
import Popover from "@/components/popover";
import { Calendar } from "../calendar";
import IconButton from "../icon-button";
import { FormLabel } from "./label";

function formatDate(date: Date | undefined) {
  if (!date) return "";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return !!date && !Number.isNaN(date.getTime());
}

type Props = {
  required?: boolean;
  label: string;
  className?: string;
  placeholder?: string;
};

const today = formatDate(new Date());

export function FormDatePickerInput({
  required = false,
  className,
  label,
  placeholder = today,
}: Props) {
  const dataPickerId = React.useId();
  const resolvedDataPickerId = dataPickerId;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01"),
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

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
          id={resolvedDataPickerId}
          value={value}
          placeholder={placeholder}
          className="input-inner"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
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
          <Popover.Trigger asChild>
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
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}

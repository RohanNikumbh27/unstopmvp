"use client";
import React from "react";
import Image from "next/image";
import "./formcomponents.css";

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  name,
  disabled = false,
  description,
  error,
  className = "",
  ...props
}) {
  const describedByIds = [];
  if (description) describedByIds.push(`${id}-desc`);
  if (error) describedByIds.push(`${id}-error`);
  const describedBy = describedByIds.length ? describedByIds.join(" ") : undefined;

  return (
    <div className={className}>
      <div className="flex items-center">
        <div className="inline-flex items-center relative">
          <input
            id={id}
            name={name || id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2
              ${error ? "border-red-500" : "border-primary"}
              ${error ? "checked:border-red-500" : "checked:border-primary"}
              checked:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50`}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            {...props}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image src="/icons/checkbox.svg" width={30} height={30} alt="" />
          </span>
        </div>

        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="inputError">
          {error}
        </p>
      )}
    </div>
  );
}
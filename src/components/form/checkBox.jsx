"use client";
import Image from "next/image";

export default function CheckBox({
  id = "rememberMe",
  label = "Check this",
  checked = false,
  onChange,
  name,
  disabled = false,
  error,
  className = "",
}) {
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
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image src="/icons/checkbox.svg" width={30} height={30} alt="" />
          </span>
        </div>

        {label && (
          <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>

      {error && <p className="inputError">{error}</p>}
    </div>
  );
}

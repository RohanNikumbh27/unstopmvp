"use client";
import React from "react";
import Image from "next/image";

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon,
  name,
  error,
  setErrors,
  errorKey,
  ...props
}) => {
  const describedBy = error ? `${id}-error` : undefined;

  const handleChange = (e) => {
    onChange?.(e);
    if (setErrors && errorKey) {
      setErrors((prev = {}) => {
        if (!prev[errorKey]) return prev;
        const { [errorKey]: _removed, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <div>
      <div className={`inputContainer ${error ? "error" : ""}`}>
        {icon && (
          <span className="leftIcon" aria-hidden="true">
            <Image src={icon} width={24} height={24} alt="" />
          </span>
        )}

        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder=" "
          className="floatingInput"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />

        <label htmlFor={id} className="floatingLabel">
          {label}
        </label>
      </div>

      {error && (
        <p id={`${id}-error`} className="inputError">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

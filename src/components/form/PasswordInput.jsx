"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function PasswordInput({
  id = "password",
  label = "Password",
  value,
  onChange,
  icon = "/icons/key.svg",
  error,
  setErrors,
  errorKey,
  ...props
}) {
  const [show, setShow] = useState(false);
  const { type: _ignoreType, ...rest } = props;
  const describedBy = error ? `${id}-error` : undefined;

  const handleChange = (e) => {
    onChange?.(e);
    if (setErrors && errorKey) {
      setErrors((prev = {}) => {
        if (!prev[errorKey]) return prev;
        const { [errorKey]: _removed, ...restErrors } = prev;
        return restErrors;
      });
    }
  };

  return (
    <div>
      <div className={`inputContainer ${error ? "error" : ""}`}>
        <span className="leftIcon" aria-hidden="true">
          <Image src={icon} width={24} height={24} alt="" />
        </span>

        <input
          {...rest}
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={handleChange}
          placeholder=" "
          className="floatingInput"
          name={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
        <label htmlFor={id} className="floatingLabel">
          {label}
        </label>
        <span
          className="rightIcon"
          onClick={() => setShow((s) => !s)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          role="button"
          tabIndex={0}
        >
          {show ? (
            <Image src="/icons/eyeopen.svg" width={24} height={24} alt="show password" />
          ) : (
            <Image src="/icons/eyeclosed.svg" width={24} height={24} alt="hide password" />
          )}
        </span>
      </div>

      {error && (
        <p id={`${id}-error`} className="inputError">
          {error}
        </p>
      )}
    </div>
  );
}

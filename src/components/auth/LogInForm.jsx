"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";
import PasswordInput from "@/components/form/PasswordInput";
import CheckBox2 from "@/components/form/CheckBox2";
const LogInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      router.push("/home");
    }
  }, [router]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    const newErrors = {};
    if (username !== "emilys") {
      newErrors.username = "Please enter a valid Username!";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      username,
      password,
      expiresInMins: 30,
    };
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ api: data?.message || "Login failed" });
        return;
      }
      localStorage.setItem("userData", JSON.stringify(data));
      router.push("/home");
    } catch (err) {
      setErrors({ api: "Network error, please try again" });
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-[10px] flex flex-col"
      >
        <Input
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon="/icons/accounticon.svg"
          error={errors.username}
          setErrors={setErrors}
          errorKey="username"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="/icons/email.svg"
          error={errors.email}
          setErrors={setErrors}
          errorKey="email"
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="/icons/key.svg"
          error={errors.password}
          setErrors={setErrors}
          errorKey="password"
        />

        <div className="flex justify-between items-center py-2">
          <CheckBox2
            id="rememberMe"
            label="Remember Me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <a
            href="#"
            className="text-[16px] text-primary font-[400] hover:underline"
            Expand
            Down
          >
            Forgot Password?
          </a>
        </div>
        {errors.api && (
          <p className="text-sm text-red-600 text-center">{errors.api}</p>
        )}
        <button type="submit" className="primary-btn py-[1.2rem]">
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-[16px] text-gray-600 font-[400]">
        New user?{" "}
        <a href="#" className="text-primary  hover:underline">
          Register
        </a>
      </p>
    </div>
  );
};
export default LogInForm;

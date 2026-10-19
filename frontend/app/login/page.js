"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const newErrors = {
      email: "",
      password: "",
      form: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      saveSession(data.token, data.user);
      router.replace("/sheet");
    } catch (err) {
      const message = err?.message || "Unable to sign in. Please try again.";

      if (/email|user not found|account/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          email: message,
          password: "",
          form: "",
        }));
      } else if (/password|credential|invalid/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          password: message,
          email: "",
          form: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: message,
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  function clearFieldError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      form: "",
    }));
  }

  return (
    <main className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <p className="kicker">WELCOME BACK, CODER</p>

        <h1>Ready to make progress?</h1>

        <p className="muted">
          Sign in, solve smarter, and take your coding skills to the next level.
        </p>

        {errors.form && (
          <div className="error" role="alert">
            {errors.form}
          </div>
        )}

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError("email");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && (
          <p id="email-error" className="field-error" role="alert">
            {errors.email}
          </p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <p id="password-error" className="field-error" role="alert">
            {errors.password}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 18, width: "100%" }}
          disabled={loading}
        >
          {loading ? "Signing you in..." : "Continue to dashboard"}
        </button>

        <p className="muted" style={{ marginTop: 16 }}>
          New here?{" "}
          <Link href="/register" className="underline">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
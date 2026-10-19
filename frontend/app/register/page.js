"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveSession } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    form: "",
  });
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      form: "",
    };

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.password;
  }

  function clearFieldError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      form: "",
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      saveSession(data.token, data.user);
      router.replace("/sheet");
    } catch (err) {
      const message = err?.message || "Unable to create your account. Please try again.";

      if (/email|already exists|already registered|duplicate/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          email: message,
          form: "",
        }));
      } else if (/password/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          password: message,
          form: "",
        }));
      } else if (/name/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          name: message,
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

  return (
    <main className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <p className="kicker">YOUR NEXT CHAPTER STARTS HERE</p>

        <h1>Build skills. Break limits.</h1>

        <p className="muted">
          Create your account and start mastering DSA, one challenge
          at a time.
        </p>

        {errors.form && (
          <div className="error" role="alert">
            {errors.form}
          </div>
        )}

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearFieldError("name");
          }}
          placeholder="Enter your name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && (
          <p id="name-error" className="field-error" role="alert">
            {errors.name}
          </p>
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

        <label htmlFor="password">Password (min. 6 characters)</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
          placeholder="Create a strong password"
          autoComplete="new-password"
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
          {loading ? "Creating your account..." : "Create free account"}
        </button>

        <p className="muted" style={{ marginTop: 16 }}>
          Already on the platform?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
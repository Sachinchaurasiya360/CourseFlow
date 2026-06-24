import { apiClient } from "@/utils/apiClient";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthShell, { Field, inputClass } from "./AuthShell";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

// Mirrors the server-side zod rules (signup.validation.ts) so we catch bad
// input before hitting the network.
function validate(form: SignupFormData): Partial<Record<keyof SignupFormData, string>> {
  const errors: Partial<Record<keyof SignupFormData, string>> = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (form.password.length < 6 || form.password.length > 20) {
    errors.password = "Password must be 6–20 characters";
  }

  return errors;
}

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // One generic handler for every field, keyed by the input's `name`.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/api/v1/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      // Signup does not log the user in (the server issues a session cookie only
      // on login), so send them to the login page with a success toast.
      toast.success("Account created. Please log in.");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Surface the server's message (e.g. 409 "User already exists",
        // 400 "Validation failed") when present.
        setFormError(
          error.response?.data?.message ?? "Signup failed. Please try again.",
        );
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      // Always clears loading, on both success and failure.
      setLoading(false);
    }
  };

  return (
    <AuthShell
      headlinePrefix="Create your"
      headlineAccent="account"
      subtitle="Start learning with CourseFlow today."
      switchPrompt="Already have an account?"
      switchLabel="Log in"
      switchTo="/login"
    >
      {formError && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field
          id="name"
          label="Full name"
          icon={<User className="h-4 w-4" />}
          error={fieldErrors.name}
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
            className={inputClass(!!fieldErrors.name)}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          icon={<Mail className="h-4 w-4" />}
          error={fieldErrors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
            className={inputClass(!!fieldErrors.email)}
          />
        </Field>

        <Field
          id="password"
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          error={fieldErrors.password}
        >
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            className={cn(inputClass(!!fieldErrors.password), "pr-10")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </Field>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        By signing up you agree to our Terms of Service and Privacy Policy.
      </p>
    </AuthShell>
  );
}

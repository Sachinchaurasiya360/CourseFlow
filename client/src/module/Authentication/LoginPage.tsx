import { apiClient } from "@/utils/apiClient";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthShell, { Field, inputClass } from "./AuthShell";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

function validate(form: LoginFormData): Partial<Record<keyof LoginFormData, string>> {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  
  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      
      await apiClient.post("/api/v1/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Logged in successfully.");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormError(
          error.response?.data?.message ?? "Login failed. Please try again.",
        );
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      headlinePrefix="Welcome"
      headlineAccent="back"
      subtitle="Log in to continue to CourseFlow."
      switchPrompt="Don't have an account?"
      switchLabel="Sign up"
      switchTo="/signup"
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
            placeholder="Enter your password"
            autoComplete="current-password"
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
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}

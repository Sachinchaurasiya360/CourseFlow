import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router";
import { Star } from "lucide-react";

// The CourseFlow chevron mark, matching the landing page logo.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect width="28" height="28" rx="6" fill="#1d4ed8" />
      <path
        d="M7 14L12 9L17 14L22 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 19L12 14L17 19L22 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

const AVATARS = [
  "https://images.unsplash.com/photo-1564490215983-296e5f56b623?w=80&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1609770653328-a4d1dd377970?w=80&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1582828835690-22a88e8dd257?w=80&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1533128361669-69c065857a13?w=80&q=80&fit=crop&crop=faces",
];

interface AuthShellProps {
  // Headline split so we can italicize the last word in editorial serif.
  headlinePrefix: string;
  headlineAccent: string;
  subtitle: string;
  // Navbar contextual link (e.g. Login <-> Signup).
  switchPrompt: string;
  switchLabel: string;
  switchTo: string;
  children: React.ReactNode;
}

export default function AuthShell({
  headlinePrefix,
  headlineAccent,
  subtitle,
  switchPrompt,
  switchLabel,
  switchTo,
  children,
}: AuthShellProps) {
  return (
    <div className="bg-white font-jakarta text-slate-900">
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="text-[17px] font-extrabold tracking-tight text-slate-950">
              CourseFlow
            </span>
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <span className="hidden text-slate-500 sm:inline">{switchPrompt}</span>
            <Link
              to={switchTo}
              className="rounded-md px-3 py-1.5 font-semibold text-brand transition-colors hover:bg-brand-light"
            >
              {switchLabel}
            </Link>
          </div>
        </div>
      </header>

      {/* ── BODY: brand panel + form ── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:min-h-160 lg:grid-cols-2">
        {/* Left: editorial brand panel (desktop only) */}
        <section className="relative hidden overflow-hidden bg-brand-dark px-12 py-16 lg:flex lg:flex-col lg:justify-between">
          {/* dotted texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.55), transparent 70%)",
            }}
          />

          <div className="relative">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
              CourseFlow
            </p>
            <h2 className="font-editorial text-4xl leading-[1.15] text-white">
              Courses for the{" "}
              <em className="text-blue-200">job</em> you actually want.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-blue-100/80">
              Built with engineers who do this work every day — the kind of
              courses that cover the messy parts most tutorials skip.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {AVATARS.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-brand-dark object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-blue-100">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-300 text-amber-300"
                    />
                  ))}
                  <strong className="ml-1 text-white">4.9</strong>
                </div>
                <span className="text-blue-200/80">
                  Loved by 40,000+ engineers
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right: form column */}
        <section className="relative flex items-center justify-center px-5 py-12 sm:px-8 lg:py-20">
          {/* subtle dotted grid behind the form */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e2e7f1 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          <div className="relative w-full max-w-sm">
            <div className="mb-8">
              <h1 className="font-editorial text-3xl leading-tight text-slate-950">
                {headlinePrefix} <em className="text-brand">{headlineAccent}</em>
              </h1>
              <p className="mt-2 text-[15px] text-slate-500">{subtitle}</p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}

// ── Shared form primitives ──────────────────────────────────────────────────

// Neutral by default, red ring when the field has an error.
export function inputClass(hasError: boolean): string {
  return cn(
    "h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400",
    "transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-300 focus:border-brand focus:ring-blue-100",
  );
}

// Label + icon-leading input wrapper + inline error message.
export function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

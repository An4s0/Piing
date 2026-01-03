import { useState } from "react";
import { Link } from "react-router-dom";
import { signinSchema } from "@piing/validation";
import { useTitle } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";
import OTP from "./otp";

export default function SigninPage() {
  useTitle("Piing | Signin");

  const [step, setStep] = useState<"form" | "otp">("form");
  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function updateField<K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const result = signinSchema.safeParse(formData);
    if (!result.success) {
      const firstError =
        result.error.flatten().formErrors[0] ??
        Object.values(result.error.flatten().fieldErrors)[0]?.[0];

      setFormError(firstError ?? "Invalid credentials");
      return;
    }

    // ... API

    setStep("otp");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === "form" ? "Sign in to Piing" : "Verify your email"}
          </h1>
          <p className="text-sm text-subtle">
            {step === "form"
              ? "Welcome back. Enter your details to continue."
              : "Enter the 6-digit code sent to your email."}
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={onSubmitForm} className="space-y-4">
            {formError && (
              <div className="text-sm text-danger">{formError}</div>
            )}

            <input
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="example@example.com"
              autoComplete="email"
              className="w-full rounded-md border border-border bg-bg px-3 py-2"
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full rounded-md border border-border bg-bg px-3 py-2 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white rounded-md py-2 hover:bg-primary-hover cursor-pointer"
            >
              Sign in
            </button>

            <p className="text-sm text-muted text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="underline hover:text-text">
                Sign up
              </Link>
            </p>
          </form>
        ) : (
          <OTP email={formData.email} onBack={() => setStep("form")} />
        )}
      </div>
    </div>
  );
}

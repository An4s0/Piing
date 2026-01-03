import { useState } from "react";
import { Link } from "react-router-dom";
import { signupSchema } from "@piing/validation";
import { useTitle } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";
import OTP from "./otp";

export default function SignupPage() {
  useTitle("Piing | Signup");

  const [step, setStep] = useState<"form" | "otp">("form");
  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const firstError =
        result.error.flatten().formErrors[0] ??
        Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      setFormError(firstError ?? "Invalid form data");
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
            {step === "form" ? "Create your account" : "Verify your email"}
          </h1>
          <p className="text-sm text-subtle">
            {step === "form"
              ? "Get started with Piing in seconds."
              : "Enter the 6-digit code sent to your email."}
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={onSubmitForm} className="space-y-4">
            {formError && (
              <div className="text-sm text-danger">{formError}</div>
            )}

            <input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your name"
              className="w-full rounded-md border border-border bg-bg px-3 py-2"
            />

            <input
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="example@example.com"
              className="w-full rounded-md border border-border bg-bg px-3 py-2"
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Password"
                className="w-full rounded-md border border-border bg-bg px-3 py-2 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <input
              type={showPass ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                updateField("confirmPassword", e.target.value)
              }
              placeholder="Confirm password"
              className="w-full rounded-md border border-border bg-bg px-3 py-2"
            />

            <button className="w-full bg-primary text-white rounded-md py-2 hover:bg-primary-hover cursor-pointer">
              Create account
            </button>

            <p className="text-sm text-muted text-center">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign in
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

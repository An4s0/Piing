import { useState } from "react";
import { Link } from "react-router-dom";
import { signupSchema } from "@piing/validation";
import { useTitle } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";
import { OTP } from "@/components/auth";
import { Input, Button } from "@/components/ui";

type Step = "form" | "otp";

export default function SignupPage() {
  useTitle("Piing | Signup");

  const [step, setStep] = useState<Step>("form");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (k: keyof typeof data) => (v: string) =>
    setData((p) => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = signupSchema.safeParse(data);
    if (!result.success) {
      const flat = result.error.flatten();
      setError(
        flat.formErrors[0] ??
          Object.values(flat.fieldErrors)[0]?.[0] ??
          "Invalid form data"
      );
      return;
    }

    // ... Signup Logic

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
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="text-sm text-danger">{error}</p>}

            <Input
              value={data.name}
              onChange={(e) => update("name")(e.target.value)}
              placeholder="Your name"
            />

            <Input
              value={data.email}
              onChange={(e) => update("email")(e.target.value)}
              placeholder="example@example.com"
              autoComplete="email"
            />

            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={data.password}
                onChange={(e) => update("password")(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Input
              type={showPass ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) => update("confirmPassword")(e.target.value)}
              placeholder="Confirm password"
              autoComplete="new-password"
            />

            <Button type="submit" className="w-full">
              Create account
            </Button>

            <p className="text-sm text-muted text-center">
              Already have an account?{" "}
              <Link to="/signin" className="underline hover:text-text">
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <OTP email={data.email} onBack={() => setStep("form")} />
        )}
      </div>
    </div>
  );
}

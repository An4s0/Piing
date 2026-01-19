import { useState } from "react";
import { Link } from "react-router-dom";
import { signinSchema } from "@piing/validation";
import { useTitle } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";
import { OTP } from "@/components/auth";
import { Input, Button } from "@/components/ui";
import { auth } from "@/utils/auth";

type Step = "form" | "otp";

export default function SigninPage() {
  useTitle("Piing | Signin");

  const [step, setStep] = useState<Step>("form");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const update = (k: keyof typeof data) => (v: string) =>
    setData((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationResult = signinSchema.safeParse(data);
    if (!validationResult.success) {
      const flat = validationResult.error.flatten();
      setError(
        flat.formErrors[0] ??
          Object.values(flat.fieldErrors)[0]?.[0] ??
          "Invalid credentials",
      );
      return;
    }

    const result = await auth.signin(data);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setUserID(result.data.user.id);
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
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="text-sm text-danger">{error}</p>}

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
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="text-sm text-muted text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="underline hover:text-text">
                Sign up
              </Link>
            </p>
          </form>
        ) : (
          <OTP
            email={data.email}
            user_id={userID!}
            onBack={() => setStep("form")}
          />
        )}
      </div>
    </div>
  );
}

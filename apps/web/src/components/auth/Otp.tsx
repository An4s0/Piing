import { useRef, useState } from "react";
import { otpSchema } from "@piing/validation";
import { Button } from "@/components/ui";
import { auth } from "@/utils/auth";
import { cookies } from "@/utils/cookies";
import { storageUser } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;

export function OTP({
  email,
  user_id,
  onBack,
}: {
  email: string;
  user_id: string;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const focus = (i: number) =>
    refs.current[Math.max(0, Math.min(i, OTP_LENGTH - 1))]?.focus();

  const updateOtp = (fn: (arr: string[]) => void) => {
    setOtp((prev) => {
      const next = [...prev];
      fn(next);
      return next;
    });
  };

  function handleChange(i: number, value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      updateOtp((a) => (a[i] = ""));
      return;
    }

    updateOtp((a) => {
      digits
        .slice(0, OTP_LENGTH - i)
        .split("")
        .forEach((d, k) => (a[i + k] = d));
    });

    focus(i + digits.length);
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[i]) {
        updateOtp((a) => (a[i] = ""));
      } else {
        updateOtp((a) => (a[i - 1] = ""));
        focus(i - 1);
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focus(i - 1);
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focus(i + 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!digits) return;
    e.preventDefault();

    updateOtp((a) => digits.split("").forEach((d, i) => (a[i] = d)));

    focus(digits.length - 1);
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    const validationResult = otpSchema.safeParse({ code });

    if (!validationResult.success) {
      setError("Please enter the 6-digit code.");
      return;
    }

    const result = await auth.verifyOtp({ code, user_id });

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    storageUser.set(result.data.user);
    cookies.set("token", result.data.token);
    navigate("/");
  }

  const complete = otp.every(Boolean);

  return (
    <form onSubmit={onVerify} className="space-y-4">
      <p className="text-sm text-subtle text-center">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium text-text">{email}</span>
      </p>

      {error && <p className="text-sm text-danger text-center">{error}</p>}

      <div className="flex items-center justify-center gap-2">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`OTP digit ${i + 1}`}
            className="
              w-11 h-11 text-center text-lg font-semibold
              rounded-md border border-border bg-bg text-text
            "
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={!complete}
        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify
      </Button>

      <div className="flex items-center justify-end text-sm">
        <button
          type="button"
          onClick={onBack}
          className="text-muted hover:text-text underline underline-offset-4 cursor-pointer"
        >
          Change email
        </button>
      </div>
    </form>
  );
}

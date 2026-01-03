import { useRef, useState } from "react";
import { otpSchema } from "@piing/validation";

export default function OTP({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  function setOtpAt(i: number, v: string) {
    setOtp((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  }

  function handleOtpChange(i: number, value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      setOtpAt(i, "");
      return;
    }

    const chars = digits.split("").slice(0, 6 - i);
    setOtp((prev) => {
      const next = [...prev];
      for (let k = 0; k < chars.length; k++) {
        next[i + k] = chars[k];
      }
      return next;
    });

    const nextIndex = Math.min(i + chars.length, 5);
    setTimeout(() => otpRefs.current[nextIndex]?.focus(), 0);
  }

  function handleOtpKeyDown(
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace") {
      if (otp[i]) {
        setOtpAt(i, "");
        return;
      }
      const prev = Math.max(i - 1, 0);
      otpRefs.current[prev]?.focus();
      setOtpAt(prev, "");
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      otpRefs.current[Math.max(i - 1, 0)]?.focus();
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      otpRefs.current[Math.min(i + 1, 5)]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, 6);
    if (!digits) return;

    e.preventDefault();
    const arr = digits.split("");
    setOtp((prev) => {
      const next = [...prev];
      for (let i = 0; i < 6; i++) next[i] = arr[i] ?? "";
      return next;
    });

    const lastFilled = Math.min(digits.length - 1, 5);
    setTimeout(() => otpRefs.current[lastFilled]?.focus(), 0);
  }

  function onVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    const result = otpSchema.safeParse({ code });

    if (!result.success) {
      setError("Please enter the 6-digit code.");
      return;
    }

    // ... API

    alert(code);
  }

  const otpComplete = otp.every(Boolean);

  return (
    <form onSubmit={onVerifyOtp} className="space-y-4">
      <p className="text-sm text-subtle text-center">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium text-text">{email}</span>
      </p>

      {error && <p className="text-sm text-danger text-center">{error}</p>}

      <div className="flex items-center justify-center gap-2">
        {otp.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            value={d}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            onPaste={handleOtpPaste}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            className="
              w-11 h-11 text-center text-lg font-semibold
              rounded-md border border-border bg-bg text-text
            "
            aria-label={`OTP digit ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!otpComplete}
        className="
          w-full rounded-md px-4 py-2 text-sm font-medium
          bg-primary text-white hover:bg-primary-hover
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
        "
      >
        Verify
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => {
            setOtp(Array(6).fill(""));
            setTimeout(() => otpRefs.current[0]?.focus(), 0);
            // ... API
          }}
          className="text-subtle hover:text-text underline underline-offset-4 cursor-pointer"
        >
          Resend code
        </button>

        <button
          type="button"
          onClick={onBack}
          className="text-muted hover:text-text underline underline-offset-4  cursor-pointer"
        >
          Change email
        </button>
      </div>
    </form>
  );
}

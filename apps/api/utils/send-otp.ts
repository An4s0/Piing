import { transporter } from "./transporter";

export async function sendOtp({
  to,
  otp,
}: {
  to: string;
  otp: string;
}): Promise<void> {
  await transporter.sendMail({
    from: `"Piing" <${process.env.SMTP_FROM}>`,
    to,
    subject: "Your Piing verification code",
    text: `Your verification code is: ${otp}`,
    html: `
      <div style="
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 24px;
      ">
        <p style="margin: 0 0 12px; color: #374151; font-size: 20px;">
          Your Piing verification code
        </p>

        <div style="
          display: inline-block;
          background: #7c3aed;
          color: #ffffff;
          font-size: 26px;
          font-weight: bold;
          letter-spacing: 6px;
          padding: 10px 18px;
          border-radius: 8px;
        ">
          ${otp}
        </div>

        <p style="margin-top: 12px; font-size: 16px; color: #6b7280;">
          Expires in a few minutes
        </p>
      </div>
    `,
  });
}

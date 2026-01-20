import { transporter } from "./transporter";

export async function sendReminder({
  to,
  title,
  description,
  scheduled_at,
}: {
  to: string;
  title: string;
  description?: string | null;
  scheduled_at: Date;
}) {
  await transporter.sendMail({
    from: `"Piing" <${process.env.SMTP_FROM}>`,
    to,
    subject: `⏰ Reminder: ${title}`,
    html: `
  <div style="
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 24px;
  ">
    <p style="
      margin: 0 0 12px;
      color: #374151;
      font-size: 20px;
      font-weight: 500;
    ">
      ⏰ Your Piing reminder
    </p>

    <div style="
      display: inline-block;
      background: #7c3aed;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
      padding: 14px 22px;
      border-radius: 10px;
      max-width: 100%;
      word-wrap: break-word;
    ">
      ${title}
    </div>

    ${
      description
        ? `
          <p style="
            margin: 14px 0 0;
            font-size: 16px;
            color: #6b7280;
            line-height: 1.5;
          ">
            ${description}
          </p>
        `
        : ""
    }

    <p style="
      margin-top: 16px;
      font-size: 14px;
      color: #9ca3af;
    ">
      Scheduled for
      <br />
      <strong style="color: #374151;">
        ${new Date(scheduled_at).toLocaleString()}
      </strong>
    </p>
  </div>
`,
  });
}

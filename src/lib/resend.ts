import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function resendEmailConfirmation({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const email = await resend.emails.send({
      from: "Lucas & Caro <noreply@lucasycaro.com>",
      to,
      subject,
      html,
    });
    return email;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

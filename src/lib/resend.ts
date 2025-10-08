/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Resend } from "resend";
import {
  buildWeddingInfoEmailHTML,
  buildWeddingInfoEmailText,
} from "./emails/weddingInfoEmail";
import { env } from "../env";

const resend = new Resend(env.RESEND_API_KEY);
const FROM_ADDRESS = env.RESEND_FROM ?? "Lucas & Caro <onboarding@resend.dev>";

export async function resendEmailConfirmation({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const email = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
      text,
    });
    return email;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

export async function sendWeddingInfoEmail({
  to,
  guestName,
}: {
  to: string;
  guestName?: string;
}) {
  const html = buildWeddingInfoEmailHTML({ guestName });
  const text = buildWeddingInfoEmailText({ guestName });
  return resendEmailConfirmation({
    to,
    subject: "Información de la boda - Lucas & Caro",
    html,
    text,
  });
}

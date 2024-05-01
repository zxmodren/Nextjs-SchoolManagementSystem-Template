import { resend } from "./resend";
import {Email} from "@/components/email/email";
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "Reset your password",
    react: Email({ url: resetLink, titleEmail:"Reset Password" }),
    text: "", // Provide an empty string as a placeholder for the text version
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "Confirm your email",
    react: Email({ url: confirmLink, titleEmail:"Verification Account" }),
    text: "", // Provide an empty string as a placeholder for the text version
  });
};

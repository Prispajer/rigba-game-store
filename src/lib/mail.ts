import { Resend } from "resend";

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const logoUrl =
  "https://drive.google.com/uc?export=view&id=1wmkx2iglt5ag9WMFwepz-Ulfwr3iNhdy";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #245f92; color: white; padding: 20px; text-align: center;">
    <div style="margin-bottom: 20px;">
        <img src="${logoUrl}" width="90" height="90" alt="logo" style="display: block; margin: 0 auto;" />
    </div>
    <h2 style="color: white; font-size: 24px; margin-bottom: 10px;">Reset Password</h2>
    <p style="font-size: 16px; color: #ddd;">Your reset password link:</p>
    <p style="text-align: center; font-size: 16px; color: #ddd;">Click <a href="${confirmLink}" style="color: #FF4C61;">here</a> to confirm your email.</p>
    </div>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #245f92; color: white; padding: 20px; text-align: center;">
    <div style="margin-bottom: 20px;">
        <img src="${logoUrl}" width="90" height="90" alt="logo" style="display: block; margin: 0 auto;" />
    </div>
    <h2 style="color: white; font-size: 24px; margin-bottom: 10px;">Email Verification</h2>
    <p style="font-size: 16px; color: #ddd;">Your email verification link:</p>
    <p style="text-align: center; font-size: 16px; color: #ddd;">Click <a href="${confirmLink}" style="color: #FF4C61;">here</a> to confirm your email.</p>
    </div>
    `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #245f92; color: white; padding: 20px; text-align: center;">
    <div style="margin-bottom: 20px;">
        <img src="${logoUrl}" width="90" height="90" alt="logo" style="display: block; margin: 0 auto;" />
    </div>
    <h2 style="color: white; font-size: 24px; margin-bottom: 10px;">2FA Code</h2>
    <p style="font-size: 16px; color: #ddd;">Your 2FA code:</p>
     <p style="font-size: 18px; color: #f3bfc7; font-weight: bold;">${token}</p>
    </div>
    `,
  });
};

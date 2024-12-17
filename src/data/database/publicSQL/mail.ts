import { Resend } from "resend";

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #2D2D2D; color: white; padding: 20px;">
        <div style="text-align: center;">
          <img src="cid:logo" width="90" height="90" alt="logo" style="margin-bottom: 20px;" />
        </div>
        <h2 style="text-align: center; color: #fff; font-size: 24px;">Reset your password</h2>
        <p style="text-align: center; font-size: 16px; color: #ddd;">To reset your password, click the link below:</p>
        <p style="text-align: center; font-size: 18px;">
          <a href="${confirmLink}" style="background-color: #FF4C61; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p style="text-align: center; font-size: 14px; color: #bbb; margin-top: 20px;">
          If you did not request this password reset, you can safely ignore this message.
        </p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #2D2D2D; color: white; padding: 20px;">
        <div style="text-align: center;">
          <img src="cid:logo" width="90" height="90" alt="logo" style="margin-bottom: 20px;" />
        </div>
        <h2 style="text-align: center; color: #fff; font-size: 24px;">Confirm your email</h2>
        <p style="text-align: center; font-size: 16px; color: #ddd;">Click the link below to confirm your email address:</p>
        <p style="text-align: center; font-size: 18px;">
          <a href="${confirmLink}" style="background-color: #FF4C61; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        </p>
        <p style="text-align: center; font-size: 14px; color: #bbb; margin-top: 20px;">
          If you did not request this, please ignore this message.
        </p>
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
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #2D2D2D; color: white; padding: 20px;">
        <div style="text-align: center;">
          <img src="cid:logo" width="90" height="90" alt="logo" style="margin-bottom: 20px;" />
        </div>
        <h2 style="text-align: center; color: #fff; font-size: 24px;">Your 2FA Code</h2>
        <p style="text-align: center; font-size: 16px; color: #ddd;">Your 2FA code is:</p>
        <p style="text-align: center; font-size: 24px; color: #FF4C61; font-weight: bold;">${token}</p>
        <p style="text-align: center; font-size: 14px; color: #bbb; margin-top: 20px;">
          If you did not request this, please ignore this message.
        </p>
      </div>
    `,
  });
};

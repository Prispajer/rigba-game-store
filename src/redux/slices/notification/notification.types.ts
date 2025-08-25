export type NotificationState = {
  success: boolean;
  message: string | null;
  origin: NotificationOrigin | null;
};

export type NotificationPayload = {
  message: string;
  origin: NotificationOrigin;
};

export enum NotificationOrigin {
  Login = "Login",
  Register = "Register",
  NewPassword = "NewPassword",
  ResetPassword = "ResetPassword",
  ChangePassword = "ChangePassword",
  EmailVerification = "EmailVerification",
  ToggleTwoFactor = "ToggleTwoFactor",
  ToggleTwoFactorToken = "ToggleTwoFactorToken",
  ChangePasswordToken = "ChangePasswordToken",
  UpdateName = "UpdateName",
  UpdateData = "UpdateData",
  AddReviewToProduct = "AddReviewToProduct",
}

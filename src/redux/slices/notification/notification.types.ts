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
  UpdateName = "UpdateName",
  UpdateData = "UpdateData",
  AddReviewToProduct = "AddReviewToProduct",
}

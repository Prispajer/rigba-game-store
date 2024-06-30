import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/userService";
import IUserService from "@/utils/interfaces/iUserService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();

  const userService: IUserService = new UserService(email);
  const resetPasswordResponse = await userService.handleSendResetPassword();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data,
  });
}

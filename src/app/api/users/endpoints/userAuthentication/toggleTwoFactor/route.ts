import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/UserService";
import IUserService from "@/interfaces/IUserService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, code } = await request.json();

  const userService: IUserService = new UserService({ email, code });
  const resetPasswordResponse = await userService.toggleTwoFactor();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data,
  });
}

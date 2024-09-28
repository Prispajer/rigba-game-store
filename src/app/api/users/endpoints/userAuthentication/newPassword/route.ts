import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/UserService";
import IUserService from "@/utils/interfaces/IUserService";

import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const { password, token } = await request.json();

  const userService: IUserService = new UserService({
    password,
    token,
  });
  const setNewPasswordResponse = await userService.setNewPassword();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: setNewPasswordResponse.success,
    message: setNewPasswordResponse.message,
    data: setNewPasswordResponse.data,
  });
}

import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";

import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { password, token } = await request.json();

  const userService: IUserService = new UserService(
    undefined,
    password,
    undefined,
    token
  );
  const setNewPasswordResponse = await userService.handleSetNewPassword();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: setNewPasswordResponse.success,
    message: setNewPasswordResponse.message,
    data: setNewPasswordResponse.data,
  });
}

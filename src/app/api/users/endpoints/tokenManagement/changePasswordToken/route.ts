import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();

  const userService: IUserService = new UserService({
    email,
  });
  const sendChangePasswordTokenResponse =
    await userService.handleSendChangePasswordToken();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: sendChangePasswordTokenResponse.success,
    message: sendChangePasswordTokenResponse.message,
    data: sendChangePasswordTokenResponse.data,
  });
}

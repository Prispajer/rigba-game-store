import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/UserService";
import IUserService from "@/interfaces/IUserService";
import { RequestResponse, EmailVerificationToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  const userService: IUserService = new UserService({
    token,
  });
  const emailVerificationResponse =
    await userService.confirmEmailVerification();

  return NextResponse.json<RequestResponse<EmailVerificationToken>>({
    success: emailVerificationResponse?.success,
    message: emailVerificationResponse?.message,
    data: emailVerificationResponse?.data,
  });
}

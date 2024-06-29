import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/userService";
import { RequestResponse, EmailVerificationToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  const userService = new UserService(undefined, undefined, undefined, token);
  const emailVerificationResponse =
    await userService.handleConfirmEmailVerification();

  return NextResponse.json<RequestResponse<EmailVerificationToken>>({
    success: emailVerificationResponse?.success,
    message: emailVerificationResponse?.message,
    data: emailVerificationResponse?.data,
  });
}

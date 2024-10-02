import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, EmailVerificationToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  const emailVerificationResponse = await userService.confirmEmailVerification({
    token,
  });

  return NextResponse.json<RequestResponse<EmailVerificationToken>>({
    success: emailVerificationResponse?.success,
    message: emailVerificationResponse?.message,
    data: emailVerificationResponse?.data,
  });
}

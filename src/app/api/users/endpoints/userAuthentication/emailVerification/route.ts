import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { EmailVerificationToken } from "@prisma/client";

export async function POST(request: NextRequest) {
  const emailVerificationClientData = await request.json();

  const emailVerificationResponse = await userService.confirmEmailVerification(
    emailVerificationClientData
  );

  return NextResponse.json<RequestResponse<EmailVerificationToken>>({
    success: emailVerificationResponse.success,
    message: emailVerificationResponse.message,
    data: emailVerificationResponse.data,
  });
}

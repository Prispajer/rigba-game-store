import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { EmailVerificationToken } from "@prisma/client";

export async function POST(request: NextRequest) {
  const emailVerificationClientData = await request.json();

  const emailVerificationResponse = await userService.confirmEmailVerification(
    emailVerificationClientData
  );

  if (!emailVerificationResponse) {
    return NextResponse.json<RequestResponse<EmailVerificationToken>>({
      success: false,
      message: "Something went wrong, no response from service.",
      data: null,
    });
  }

  return NextResponse.json<RequestResponse<EmailVerificationToken>>({
    success: emailVerificationResponse.success,
    message: emailVerificationResponse.message,
    data: emailVerificationResponse.data as EmailVerificationToken | null,
  });
}

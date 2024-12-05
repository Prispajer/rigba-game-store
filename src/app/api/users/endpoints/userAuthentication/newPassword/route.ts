import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { PasswordResetToken } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<PasswordResetToken>>> {
  const setNewPasswordClientData = await request.json();

  const setNewPasswordResponse = await userService.setNewPassword(
    setNewPasswordClientData
  );

  return NextResponse.json<RequestResponse<PasswordResetToken>>({
    success: setNewPasswordResponse.success,
    message: setNewPasswordResponse.message,
    data: setNewPasswordResponse.data as PasswordResetToken | null,
  });
}

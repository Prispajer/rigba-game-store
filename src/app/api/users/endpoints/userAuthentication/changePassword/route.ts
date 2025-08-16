import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, User } from "@/types/types";
import { UpdatePasswordDTO } from "@/utils/helpers/backendDTO";
import { TwoFactorToken } from "@prisma/client";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<User | TwoFactorToken>>> {
  const changePasswordResponseClientData = await request.json();

  const changePasswordResponse = await userService.changePassword(
    changePasswordResponseClientData
  );

  return NextResponse.json<RequestResponse<User | TwoFactorToken>>({
    success: changePasswordResponse.success,
    message: changePasswordResponse.message,
    data: changePasswordResponse.data as User | TwoFactorToken | null,
  });
}

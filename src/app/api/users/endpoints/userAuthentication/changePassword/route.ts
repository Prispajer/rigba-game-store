import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, User } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<User>>> {
  const { email, newPassword, code } = await request.json();

  const changePasswordResponse = await userService.setNewPassword({
    email,
    newPassword,
    code,
  });

  return NextResponse.json<RequestResponse<User>>({
    success: changePasswordResponse.success,
    message: changePasswordResponse.message,
    data: changePasswordResponse.data,
  });
}

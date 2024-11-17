import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, User } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<User>>> {
  const changePasswordResponseClientData = await request.json();

  const changePasswordResponse = await userService.changePassword(
    changePasswordResponseClientData
  );

  return NextResponse.json<RequestResponse<User>>({
    success: changePasswordResponse.success,
    message: changePasswordResponse.message,
    data: changePasswordResponse.data,
  });
}

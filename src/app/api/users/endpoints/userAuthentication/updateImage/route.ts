import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { User } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<User>>> {
  const updateImageClientData = await request.json();

  const updateImageResponse = await userService.updateUserImage(
    updateImageClientData
  );

  return NextResponse.json<RequestResponse<User>>({
    success: updateImageResponse.success,
    message: updateImageResponse.message,
    data: updateImageResponse.data,
  });
}

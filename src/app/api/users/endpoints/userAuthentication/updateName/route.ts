import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { User } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<User>>> {
  const updateNameClientData = await request.json();

  const updateNameResponse = await userService.updateUserName(
    updateNameClientData
  );

  return NextResponse.json<RequestResponse<User>>({
    success: updateNameResponse.success,
    message: updateNameResponse.message,
    data: updateNameResponse.data,
  });
}

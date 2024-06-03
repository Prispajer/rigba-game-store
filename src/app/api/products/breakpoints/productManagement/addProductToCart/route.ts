import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email } = userBody;

    return NextResponse.json({ success: "Reset email sent!" });
  } catch (error) {
    throw new Error("An error occurred while creating a new user.");
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";

  return NextResponse.json({
    token: `${protocol}://${host}/api/auth/callback`,
    provider: "github",
  });
}

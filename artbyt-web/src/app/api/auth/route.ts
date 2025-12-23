import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "OAUTH_CLIENT_ID not configured" },
      { status: 500 }
    );
  }

  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const callbackUrl = `${protocol}://${host}/api/auth/callback`;

  // Redirect to GitHub OAuth
  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", clientId);
  githubAuthUrl.searchParams.set("redirect_uri", callbackUrl);
  githubAuthUrl.searchParams.set("scope", "repo,user");

  return NextResponse.redirect(githubAuthUrl.toString());
}

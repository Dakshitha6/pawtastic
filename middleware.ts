import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for API key in headers
  const apiKey = request.headers.get("x-api-key");
  const requiredApiKey = process.env.API_KEY;

  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!apiKey || apiKey !== requiredApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/upload/:path*", "/api/dog-image/:path*"],
};

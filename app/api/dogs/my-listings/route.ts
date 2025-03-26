import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { getUserDogListings } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;

    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error: any) {
      console.error("Error verifying token:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const dogs = await getUserDogListings(decodedToken.uid);
    return NextResponse.json(dogs);
  } catch (error: any) {
    console.error("Error getting user's dog listings:", error);

    // Check if it's a Firebase Admin initialization error
    if (error.code === "app/no-app") {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get user's dog listings" },
      { status: 500 }
    );
  }
}

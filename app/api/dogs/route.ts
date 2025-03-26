import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import { CreateDogListingInput } from "@/lib/validations/dog";
import { createDogListing, getAllDogListings } from "@/lib/db";

export async function GET() {
  try {
    const dogs = await getAllDogListings();
    return NextResponse.json(dogs);
  } catch (error) {
    console.error("Error getting dog listings:", error);
    return NextResponse.json(
      { error: "Failed to get dog listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    const input = (await request.json()) as CreateDogListingInput;
    const id = await createDogListing(input, decodedToken.uid);

    return NextResponse.json({
      id,
      message: "Dog listing created successfully",
    });
  } catch (error) {
    console.error("Error creating dog listing:", error);
    return NextResponse.json(
      { error: "Failed to create dog listing" },
      { status: 500 }
    );
  }
}

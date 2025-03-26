import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Binary } from "mongodb";
import { auth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get and verify auth token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Get and validate form data
    const name = formData.get("name");
    const breed = formData.get("breed");
    const ageStr = formData.get("age");
    const priceStr = formData.get("price");
    const description = formData.get("description");

    // Validate required fields
    if (!name || !breed || !ageStr || !priceStr || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse numeric values
    const age = parseFloat(ageStr as string);
    const price = parseFloat(priceStr as string);

    // Validate numeric values
    if (isNaN(age) || isNaN(price)) {
      return NextResponse.json(
        { error: "Invalid age or price values" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only images are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Generate a unique file ID
    const timestamp = new Date();
    const filename = `${timestamp.getTime()}_${file.name.replace(/\s/g, "_")}`;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Create the dog listing document with embedded image data
    const dogDocument = {
      name,
      breed,
      age,
      price,
      description,
      createdAt: timestamp,
      createdBy: userId,
      image: {
        filename,
        contentType: file.type,
        size: file.size,
        uploadedAt: timestamp,
        data: new Binary(Buffer.from(buffer)),
      },
    };

    // Insert into dogs collection
    const result = await db.collection("dogs").insertOne(dogDocument);

    // Return the document ID and image URL
    return NextResponse.json({
      success: true,
      dogId: result.insertedId.toString(),
      imageId: filename,
      url: `/api/images/${filename}`,
    });
  } catch (error) {
    console.error("Error creating dog listing:", error);
    return NextResponse.json(
      { error: "Failed to create dog listing" },
      { status: 500 }
    );
  }
}

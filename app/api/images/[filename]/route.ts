import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Find the dog document with the matching image filename
    const dog = await db.collection("dogs").findOne({
      "image.filename": filename,
    });

    if (!dog || !dog.image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert Binary data back to Buffer
    const buffer = Buffer.from(dog.image.data.buffer);

    // Create response with appropriate headers
    const response = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": dog.image.contentType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000",
      },
    });

    return response;
  } catch (error) {
    console.error("Error retrieving image:", error);
    return NextResponse.json(
      { error: "Failed to retrieve image" },
      { status: 500 }
    );
  }
}

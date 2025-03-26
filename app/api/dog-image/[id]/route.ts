import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const dog = await db.collection("dogs").findOne({
      _id: new ObjectId(params.id),
    });

    if (!dog || !dog.image || !dog.image.data) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Convert binary data to Buffer
    const buffer = Buffer.from(dog.image.data.buffer);

    // Return the image with proper content type
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": dog.image.contentType || "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}

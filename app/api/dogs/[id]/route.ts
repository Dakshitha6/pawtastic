import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/firebase-admin";
import {
  getDogListing,
  updateDogListing,
  deleteDogListing,
} from "@/lib/services/dog-service";
import { UpdateDogListingInput } from "@/types/dog";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const docId = new ObjectId(params.id);
    const dog = await db.collection("dogs").findOne({ _id: docId });

    if (!dog) {
      return NextResponse.json(
        { error: "Dog listing not found" },
        { status: 404 }
      );
    }

    const data = {
      id: dog._id.toString(),
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      price: dog.price,
      description: dog.description,
      imageUrl: dog.image?.data
        ? `/api/images/${dog.image.filename}`
        : dog.imageUrl,
      createdBy: dog.createdBy,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dog:", error);
    return NextResponse.json(
      { error: "Failed to fetch dog listing" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const formData = await request.json();

    const db = await getDb();
    const docId = new ObjectId(params.id);

    // Verify ownership
    const existingDog = await db.collection("dogs").findOne({
      _id: docId,
      createdBy: decodedToken.uid,
    });

    if (!existingDog) {
      return NextResponse.json(
        {
          error:
            "Dog listing not found or you don't have permission to edit it",
        },
        { status: 403 }
      );
    }

    const updatedDogData = {
      name: formData.name,
      breed: formData.breed,
      age: parseFloat(formData.age),
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      description: formData.description,
      updatedAt: new Date(),
    };

    await db
      .collection("dogs")
      .updateOne({ _id: docId }, { $set: updatedDogData });

    return NextResponse.json({ message: "Dog listing updated successfully" });
  } catch (error) {
    console.error("Error updating dog:", error);
    return NextResponse.json(
      { error: "Failed to update dog listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const db = await getDb();
    const docId = new ObjectId(params.id);

    // Verify ownership and delete in one operation
    const result = await db.collection("dogs").deleteOne({
      _id: docId,
      createdBy: decodedToken.uid,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          error:
            "Dog listing not found or you don't have permission to delete it",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Dog listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting dog listing:", error);
    return NextResponse.json(
      { error: "Failed to delete dog listing" },
      { status: 500 }
    );
  }
}

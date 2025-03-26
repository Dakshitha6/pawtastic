"use server";

import { getDb } from "@/lib/db";
import { DogListing } from "@/types/dog";
import { ObjectId } from "mongodb";

export async function getDogs(): Promise<DogListing[]> {
  try {
    const db = await getDb();
    const dogs = await db.collection("dogs").find({}).toArray();

    return dogs.map((dog) => ({
      id: dog._id.toString(),
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      price: dog.price,
      description: dog.description,
      imageUrl: dog.image?.data
        ? `data:${dog.image.contentType};base64,${dog.image.data.toString(
            "base64"
          )}`
        : "",
      createdBy: dog.createdBy,
      createdAt: dog.createdAt,
      updatedAt: dog.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return [];
  }
}

export async function getUserDogListings(
  userId: string
): Promise<DogListing[]> {
  try {
    const db = await getDb();
    const dogs = await db
      .collection("dogs")
      .find({ createdBy: userId })
      .toArray();

    return dogs.map((dog) => ({
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
      createdAt: dog.createdAt,
      updatedAt: dog.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching user dog listings:", error);
    throw error;
  }
}

export async function deleteDogListing(id: string, userId: string) {
  try {
    const db = await getDb();
    const docId = new ObjectId(id);

    const docSnap = await db.collection("dogs").findOne({ _id: docId });
    if (!docSnap) throw new Error("Listing not found");
    if (docSnap.createdBy !== userId) throw new Error("Not authorized");

    await db.collection("dogs").deleteOne({ _id: docId });
    return { id };
  } catch (error) {
    console.error("Error deleting dog listing:", error);
    throw error;
  }
}

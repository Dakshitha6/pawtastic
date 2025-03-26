import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  CreateDogListingInput,
  DogListing,
  UpdateDogListingInput,
} from "@/types/dog";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "dogs";

export async function createDogListing(data: FormData, userId: string) {
  const response = await fetch("/api/dogs", {
    method: "POST",
    body: data,
    headers: {
      "x-user-id": userId,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create listing");
  }

  return response.json();
}

export async function updateDogListing(
  id: string,
  data: FormData,
  userId: string
) {
  const response = await fetch(`/api/dogs/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "x-user-id": userId,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update listing");
  }

  return response.json();
}

export async function deleteDogListing(id: string, userId: string) {
  const db = await getDb();
  const docId = new ObjectId(id);

  const docSnap = await db.collection("dogs").findOne({ _id: docId });
  if (!docSnap) throw new Error("Listing not found");
  if (docSnap.createdBy !== userId) throw new Error("Not authorized");

  await db.collection("dogs").deleteOne({ _id: docId });
  return { id };
}

export async function getDogListing(id: string): Promise<DogListing> {
  const response = await fetch(`/api/dogs/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch listing");
  }

  return response.json();
}

export async function getAllDogListings(): Promise<DogListing[]> {
  const response = await fetch("/api/dogs");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch listings");
  }

  return response.json();
}

export async function getUserDogListings(userId: string) {
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
}

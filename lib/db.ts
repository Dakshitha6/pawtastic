import { MongoClient } from "mongodb";
import { CreateDogListingInput } from "./validations/dog";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export { clientPromise };

// Helper to get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

export async function getUserDogListings(userId: string) {
  const db = await getDb();
  const dogs = await db
    .collection("dogs")
    .find({ createdBy: userId })
    .toArray();
  return dogs;
}

export async function getAllDogListings() {
  const db = await getDb();
  const dogs = await db.collection("dogs").find({}).toArray();
  return dogs;
}

export async function createDogListing(
  input: CreateDogListingInput,
  userId: string
) {
  const db = await getDb();
  const result = await db.collection("dogs").insertOne({
    ...input,
    createdBy: userId,
    createdAt: new Date(),
  });
  return result.insertedId;
}

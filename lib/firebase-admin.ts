import * as admin from "firebase-admin";

// Initialize Firebase Admin if it hasn't been initialized yet
if (!admin.apps.length) {
  try {
    const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
      ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;

    if (
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      !process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ||
      !privateKey
    ) {
      throw new Error("Missing required Firebase Admin credentials");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
    throw error; // Re-throw the error to prevent silent failures
  }
}

export const auth = admin.auth();

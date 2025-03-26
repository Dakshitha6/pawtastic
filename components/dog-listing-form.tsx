"use client";

import { useState } from "react";
import { DogForm } from "./dog-form";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export function DogListingForm() {
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData, imageUrl?: string) => {
    if (!user) {
      throw new Error("You must be logged in to list a dog");
    }

    if (!user.emailVerified) {
      throw new Error("Please verify your email before listing a dog");
    }

    try {
      if (!imageUrl) {
        throw new Error("Please select and upload an image");
      }

      // Create new dog listing in Firestore with the image URL from MongoDB
      const dogData = {
        name: formData.get("name") as string,
        breed: formData.get("breed") as string,
        age: parseFloat(formData.get("age") as string),
        price: parseFloat(formData.get("price") as string),
        imageUrl: imageUrl, // Use the MongoDB URL
        description: formData.get("description") as string,
        createdBy: user.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "dogs"), dogData);
    } catch (error: any) {
      console.error("Error adding dog listing:", error);
      setError(error.message || "Failed to create dog listing");
      throw error;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!user?.emailVerified && (
          <Alert variant="warning" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to verify your email before you can list a dog.
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DogForm onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DogForm } from "@/components/dog-form";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function EditDogPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [dogData, setDogData] = useState<any>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDog = async () => {
      if (!params.id || !user) return;

      try {
        const response = await fetch(`/api/dogs/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch dog listing");
        }

        // Verify ownership
        if (data.createdBy !== user.uid) {
          setError("You don't have permission to edit this listing");
          return;
        }

        setDogData(data);
      } catch (error: any) {
        console.error("Error fetching dog:", error);
        setError(error.message || "Failed to load dog listing");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDog();
    }
  }, [params.id, user]);

  const handleSubmit = async (formData: FormData, imageUrl?: string) => {
    if (!user) {
      throw new Error("You must be logged in to update a dog listing");
    }

    if (!user.emailVerified) {
      throw new Error("Please verify your email before updating a dog listing");
    }

    if (!params.id) {
      throw new Error("Dog ID is required");
    }

    try {
      // Use either the new uploaded image or keep the existing one
      const finalImageUrl = imageUrl || dogData.imageUrl;

      if (!finalImageUrl) {
        throw new Error("Please upload an image");
      }

      const token = await user.getIdToken();
      const response = await fetch(`/api/dogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
          breed: formData.get("breed"),
          age: formData.get("age"),
          price: formData.get("price"),
          imageUrl: finalImageUrl,
          description: formData.get("description"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update dog listing");
      }

      toast({
        title: "Success",
        description: "Dog listing updated successfully",
      });

      router.push("/dogs/my-listings");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating dog listing:", error);
      setError(error.message || "Failed to update dog listing");
      toast({
        title: "Error",
        description: error.message || "Failed to update dog listing",
        variant: "destructive",
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="container py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Dog Listing</h1>
      <Card>
        <CardContent className="pt-6">
          {dogData && <DogForm initialData={dogData} onSubmit={handleSubmit} />}
        </CardContent>
      </Card>
    </div>
  );
}

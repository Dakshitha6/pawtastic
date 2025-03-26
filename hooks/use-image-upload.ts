"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

interface UploadOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (data: { url: string; imageId: string; dogId: string }) => void;
  onError?: (error: Error) => void;
  formData?: FormData;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File, options?: UploadOptions) => {
    if (!file) return null;

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Get the current user's token
      const user = auth.currentUser;
      if (!user) {
        throw new Error("You must be logged in to upload images");
      }
      const token = await user.getIdToken();

      // Create form data with all the dog listing information
      const formData = new FormData();

      // If form data is provided, append all its fields
      if (options?.formData) {
        // Convert FormData entries to array for TypeScript compatibility
        const entries = Array.from(options.formData.entries());
        for (const [key, value] of entries) {
          // Ensure we're not getting null or undefined values
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      }

      // Add the file last
      formData.append("file", file);

      // Simulate progress updates (since fetch doesn't provide upload progress)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 5, 90);
          options?.onProgress?.(newProgress);
          return newProgress;
        });
      }, 100);

      // Upload the file and create dog listing
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-api-key": process.env.API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      setProgress(100);
      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      setError(error as Error);
      options?.onError?.(error as Error);
      return null;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return {
    uploadImage,
    isUploading,
    progress,
    error,
  };
}

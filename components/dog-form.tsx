"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DogListing } from "@/types/dog";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BreedSelect } from "@/components/breed-select";
import { DogBreeds, DogBreedKey } from "@/lib/constants";

interface DogFormProps {
  initialData?: DogListing;
  onSubmit: (data: FormData, imageUrl?: string) => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  breed: z.enum(Object.keys(DogBreeds) as [DogBreedKey, ...DogBreedKey[]]),
  age: z.number().min(0).max(30),
  price: z.number().min(0),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function DogForm({ initialData, onSubmit }: DogFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const { uploadImage, isUploading, progress } = useImageUpload();
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      breed: (initialData?.breed as DogBreedKey) || undefined,
      age: initialData?.age || 0,
      price: initialData?.price || 0,
      description: initialData?.description || "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      // Properly handle each field with its correct type
      formData.append("name", values.name);
      formData.append("breed", values.breed);
      formData.append("age", values.age.toString());
      formData.append("price", values.price.toString());
      formData.append("description", values.description);

      const imageInput = document.querySelector<HTMLInputElement>(
        'input[name="imageFile"]'
      );
      const file = imageInput?.files?.[0];

      if (!file && !initialData?.imageUrl) {
        throw new Error("Please select an image");
      }

      if (file) {
        const result = await uploadImage(file, {
          onProgress: () => {}, // Progress is tracked in the hook
          onSuccess: async (data) => {
            await onSubmit(formData, data.url);
            router.push("/dogs/my-listings");
          },
          onError: (error) => {
            setError(`Failed to create listing: ${error.message}`);
          },
          formData: formData, // Pass the form data to the upload function
        });

        if (!result) {
          throw new Error("Failed to create listing");
        }
      } else {
        await onSubmit(formData, initialData?.imageUrl);
        router.push("/dogs/my-listings");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const isSubmitting = loading || isUploading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-muted-foreground">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-lg bg-background border-2 border-muted/20 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-muted-foreground">
                    Breed
                  </FormLabel>
                  <FormControl>
                    <BreedSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      label="Select breed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-muted-foreground">
                      Age (years)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="h-12 text-lg bg-background border-2 border-muted/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-muted-foreground">
                      Price (₹)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="h-12 text-lg bg-background border-2 border-muted/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label
                htmlFor="imageFile"
                className="text-lg font-medium text-muted-foreground"
              >
                Dog Image
              </Label>
              <div className="relative">
                <Input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="h-12 text-lg bg-background border-2 border-muted/20 focus:border-primary cursor-pointer"
                  required={!initialData?.imageUrl}
                  disabled={isSubmitting}
                />
                {isUploading && (
                  <div className="mt-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Uploading: {progress}%
                    </p>
                  </div>
                )}
              </div>

              {imagePreview && (
                <div className="mt-4 relative aspect-square rounded-lg overflow-hidden bg-muted/10">
                  <Image
                    src={imagePreview}
                    alt="Dog preview"
                    fill
                    className="object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-muted-foreground">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[200px] text-lg bg-background border-2 border-muted/20 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {error && <p className="text-sm text-accent mt-4">{error}</p>}

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="h-12 px-6 text-base font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || (isUploading && !initialData?.imageUrl)}
            className="h-12 px-6 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isUploading && !initialData?.imageUrl
                  ? "Uploading..."
                  : "Saving..."}
              </>
            ) : initialData ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

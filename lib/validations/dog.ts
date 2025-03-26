import * as z from "zod";

export const createDogListingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.number().min(0, "Age must be a positive number"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  location: z.string().min(1, "Location is required"),
  price: z.number().min(0, "Price must be a positive number"),
  availability: z.boolean(),
});

export const updateDogListingSchema = createDogListingSchema.partial();

export type CreateDogListingInput = z.infer<typeof createDogListingSchema>;
export type UpdateDogListingInput = z.infer<typeof updateDogListingSchema>;

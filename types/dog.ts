export interface DogListing {
  id: string;
  name: string;
  breed: string;
  age: number;
  price: number;
  description: string;
  imageUrl: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateDogListingInput = Omit<
  DogListing,
  "id" | "createdBy" | "createdAt" | "updatedAt"
>;

export type UpdateDogListingInput = Partial<CreateDogListingInput>;

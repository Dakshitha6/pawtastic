import { DogListingForm } from "@/components/dog-listing-form";

export const metadata = {
  title: "List Your Dog - Pawtastic",
  description: "List your dog for adoption or fostering on Pawtastic",
};

export default function ListDogPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">List Your Dog</h1>
      <p className="text-muted-foreground mb-8">
        Fill out the form below to list your dog for adoption or fostering.
      </p>
      <DogListingForm />
    </div>
  );
}

import { getDogs } from "@/lib/actions/dogs";
import { DogCard } from "@/components/dog-card";
import { DogListing } from "@/types/dog";

export default async function BrowseDogsPage() {
  const dogs = await getDogs();

  return (
    <div className="container py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Browse Dogs</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find your perfect companion from our available dogs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {dogs.map((dog: DogListing) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>

        {dogs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No dogs available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

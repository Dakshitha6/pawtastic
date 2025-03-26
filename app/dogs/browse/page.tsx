import { getDogs } from "@/lib/actions/dogs";
import { DogCard } from "@/components/dog-card";
import { DogListing } from "@/types/dog";

export default async function BrowseDogsPage() {
  const dogs = await getDogs();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Browse Dogs</h1>
          <p className="text-muted-foreground">
            Find your perfect companion from our available dogs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

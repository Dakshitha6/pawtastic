import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Featured breed data
const featuredBreeds = [
  {
    id: "spaniel",
    name: "Spaniel Dog",
    imageUrl: "/images/spaniel.png",
    bgColor: "bg-gray-100",
  },
  {
    id: "labrador",
    name: "Labrador Retriever",
    imageUrl: "/images/labrador.png",
    bgColor: "bg-gray-100",
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    imageUrl: "/images/german.png",
    bgColor: "bg-gray-100",
  },
  {
    id: "bulldog",
    name: "Bulldog",
    imageUrl: "/images/bulldog.png",
    bgColor: "bg-gray-100",
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    imageUrl: "/images/golden.png",
    bgColor: "bg-gray-100",
  },
  {
    id: "husky",
    name: "Siberian Husky",
    imageUrl: "/images/husky.png",
    bgColor: "bg-gray-100",
  },
];

export function FeaturedBreeds() {
  return (
    <div className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Dog Breeds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 px-24">
          {featuredBreeds.map((breed) => (
            <Link key={breed.id} href={`/breeds/${breed.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0">
                <div
                  className={`${breed.bgColor} p-0 rounded-t-lg aspect-square relative`}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    <Image
                      src={breed.imageUrl}
                      alt={breed.name}
                      width={200}
                      height={200}
                      className="object-cover w-[80%] h-[80%] relative z-10"
                    />
                  </div>
                  <div className="absolute inset-0 bg-white/10 bg-[length:20px_20px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)1px,transparent_1px)]"></div>
                </div>
                <CardContent className="p-3 bg-background flex items-center justify-center">
                  <h3 className="font-bold uppercase text-center tracking-wide text-sm">
                    {breed.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DogListing } from "@/types/dog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface DogListingsProps {
  initialDogs: DogListing[];
}

export function DogListings({ initialDogs }: DogListingsProps) {
  const [dogs] = useState(initialDogs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogs.map((dog) => (
        <Link key={dog.id} href={`/dogs/${dog.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              <Image
                src={dog.imageUrl}
                alt={dog.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle>{dog.name}</CardTitle>
              <CardDescription>{dog.breed}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {dog.age} {dog.age === 1 ? "year" : "years"} old
              </p>
              <p className="text-lg font-semibold mt-2">
                {formatCurrency(dog.price)}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {dog.description}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

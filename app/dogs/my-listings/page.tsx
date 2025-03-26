"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { DogListing } from "@/types/dog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedCard } from "@/components/animated-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getUserDogListings } from "@/lib/actions/dogs";
import { useToast } from "@/components/ui/use-toast";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<DogListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingDogId, setDeletingDogId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      try {
        const data = await getUserDogListings(user.uid);
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your listings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user, toast]);

  const handleDeleteClick = (id: string) => {
    setDeletingDogId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDogId || !user) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/dogs/${deletingDogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete listing");
      }

      setListings(listings.filter((dog) => dog.id !== deletingDogId));
      toast({
        title: "Success",
        description: "Listing deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteModalOpen(false);
      setDeletingDogId(null);
    }
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10"
      >
        <h1 className="text-3xl font-bold mb-6">My Listings</h1>
        <p className="text-muted-foreground mb-4">
          Please sign in to view your listings.
        </p>
        <Button onClick={() => router.push("/login")}>Sign In</Button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container py-10"
      >
        <h1 className="text-3xl font-bold mb-6">My Listings</h1>
        <p className="text-muted-foreground">Loading...</p>
      </motion.div>
    );
  }

  if (listings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10"
      >
        <h1 className="text-3xl font-bold mb-6">My Listings</h1>
        <p className="text-muted-foreground mb-4">
          You haven't created any listings yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold">My Listings</h1>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {listings.map((dog, index) => (
          <AnimatedCard key={dog.id} index={index} className="h-full">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={dog.imageUrl}
                alt={dog.name}
                fill
                className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
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
            <CardFooter className="flex justify-between">
              <Link href={`/dogs/${dog.id}/edit`} passHref>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDeleteClick(dog.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </AnimatedCard>
        ))}
      </motion.div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingDogId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Dog Listing"
        description="Are you sure you want to delete this listing? This action cannot be undone."
      />
    </div>
  );
}

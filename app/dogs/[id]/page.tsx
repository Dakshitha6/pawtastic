"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getDogListing } from "@/lib/services/dog-service";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DogListing } from "@/types/dog";
import { useAuth } from "@/contexts/auth-context";
import { LoginAlertDialog } from "@/components/login-alert-dialog";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DogPage({ params }: PageProps) {
  const [dog, setDog] = useState<DogListing | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const data = await getDogListing(params.id);
        setDog(data);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    if (!dog) return;
    addToCart(dog);
    toast({
      title: "Added to cart",
      description: `${dog.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    if (!dog) return;
    addToCart(dog);
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!dog) {
    return notFound();
  }

  return (
    <>
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={dog.imageUrl}
              alt={dog.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold">{dog.name}</h1>
              <p className="text-xl text-muted-foreground">{dog.breed}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{formatCurrency(dog.price)}</p>
              <p className="text-muted-foreground">
                {dog.age} {dog.age === 1 ? "year" : "years"} old
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {dog.description}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LoginAlertDialog
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
      />
    </>
  );
}

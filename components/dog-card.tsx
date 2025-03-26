"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DogListing } from "@/types/dog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DogCardProps {
  dog: DogListing;
}

export function DogCard({ dog }: DogCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
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
    addToCart(dog);
    router.push("/checkout");
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={dog.imageUrl}
            alt={dog.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{dog.name}</h3>
              <p className="text-sm text-muted-foreground">{dog.breed}</p>
            </div>
            <p className="text-lg font-bold">{formatCurrency(dog.price)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm">Age: {dog.age} years</p>
            <div>
              <p
                className={cn(
                  "text-sm text-muted-foreground transition-all duration-300",
                  !isExpanded && "line-clamp-2"
                )}
              >
                {dog.description}
              </p>
              {dog.description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-primary hover:underline mt-1 focus:outline-none"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button className="flex-1" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </CardFooter>
      </Card>

      <LoginAlertDialog
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
      />
    </>
  );
}

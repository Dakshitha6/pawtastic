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
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={dog.imageUrl}
            alt={dog.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <CardContent className="p-6 flex-1">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xl truncate">{dog.name}</h3>
              <p className="text-muted-foreground mt-1">{dog.breed}</p>
            </div>
            <p className="text-lg font-bold whitespace-nowrap">
              {formatCurrency(dog.price)}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              {dog.age} {dog.age === 1 ? "year" : "years"} old
            </p>
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
                  className="text-sm text-primary hover:underline mt-2 focus:outline-none"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-3 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button size="sm" className="flex-1 h-9" onClick={handleBuyNow}>
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

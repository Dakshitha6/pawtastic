"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LogIn, Menu, X, PawPrint } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileDropdown } from "@/components/profile-dropdown";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dogs") {
      return pathname === "/dogs" || pathname.startsWith("/dogs/");
    }
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Pawtastic</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dogs"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/dogs") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Browse Dogs
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-sm font-medium",
                      isActive("/learn-more")
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    Learn More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {learnMoreItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-sm font-medium",
                      isActive("/services")
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {services.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={service.href}
                        >
                          {service.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dogs/my-listings">
                <Button variant="outline" size="sm">
                  My Listings
                </Button>
              </Link>
              <Link href="/list-dog">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  List Your Dog
                </Button>
              </Link>
              <ProfileDropdown />
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-background z-40 md:hidden">
          <nav className="container py-8">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/dogs"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary block",
                    isActive("/dogs") ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Dogs
                </Link>
              </li>
              {learnMoreItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary block",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary block",
                    isActive("/services")
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const services = [
  {
    title: "Dog Training",
    href: "/services",
    description: "Professional training services for all breeds and ages.",
  },
  {
    title: "Veterinary Care",
    href: "/services",
    description: "Expert veterinary care and health check-ups.",
  },
  {
    title: "Grooming",
    href: "/services",
    description:
      "Professional grooming services to keep your pet looking their best.",
  },
  {
    title: "Boarding",
    href: "/services",
    description: "Safe and comfortable boarding facilities for your pets.",
  },
];

const learnMoreItems = [
  {
    title: "About Us",
    href: "/about",
    description:
      "Learn about our mission for responsible dog adoption and sales.",
  },
  {
    title: "Available Breeds",
    href: "/about",
    description:
      "Explore our diverse range of dog breeds and find your perfect match.",
  },
  {
    title: "Adoption Process",
    href: "/about",
    description: "Step-by-step guide to adopting your new furry friend.",
  },
  {
    title: "Success Stories",
    href: "/about",
    description: "Read heartwarming stories from our happy adopters.",
  },
  {
    title: "FAQs",
    href: "/about",
    description: "Find answers to commonly asked questions about adoption.",
  },
];

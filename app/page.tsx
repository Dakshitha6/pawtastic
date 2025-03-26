"use client";

import { Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load ParallaxSection with Suspense
const ParallaxSection = lazy(() =>
  import("@/components/parallax-scroll").then((mod) => ({
    default: mod.ParallaxSection,
  }))
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureCard = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Find Your Perfect
              <motion.span
                className="text-primary block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Furry Friend
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Discover loving companions and expert pet care services. Your
              journey to pet parenthood starts here.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/dogs">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
                >
                  Browse Dogs <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative hidden lg:block h-[600px] w-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1"
              alt="Happy dog"
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={75}
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR4SEhsdHR8dHR8dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <motion.div
              className="absolute bottom-12 -left-8 bg-background p-6 rounded-lg shadow-xl dark:bg-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold dark:text-gray-900">
                    Trusted Care
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-600">
                    By pet lovers
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      </section>

      {/* Features Section - Now with Suspense */}
      <Suspense
        fallback={
          <div className="py-24 bg-muted/5">
            <div className="container">
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-muted h-64 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ParallaxSection>
          <section className="py-24 bg-muted/5">
            <div className="container">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                <p className="text-lg text-muted-foreground">
                  We provide comprehensive pet care services with a focus on
                  your pet's well-being
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: <Shield className="h-6 w-6 text-primary" />,
                    title: "Safe & Secure",
                    description:
                      "We ensure the safety and security of every pet",
                  },
                  {
                    icon: <Star className="h-6 w-6 text-secondary" />,
                    title: "Expert Care",
                    description:
                      "Our team of veterinarians and pet care experts are always available",
                  },
                  {
                    icon: <Heart className="h-6 w-6 text-accent" />,
                    title: "Loving Homes",
                    description:
                      "We carefully match pets with loving families for the perfect fit",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    variants={featureCard}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </ParallaxSection>
      </Suspense>

      {/* CTA Section */}
      <ParallaxSection offset={30}>
        <section className="py-24 bg-primary/5">
          <div className="container">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Find Your New Best Friend?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Browse our available dogs or list your pet for adoption
              </p>
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/dogs">
                  <Button
                    size="lg"
                    className="transition-transform hover:scale-105"
                  >
                    Browse Dogs
                  </Button>
                </Link>
                <Link href="/list-dog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-transform hover:scale-105"
                  >
                    List Your Dog
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}

// Route segment config
export const dynamic = "force-dynamic";
export const revalidate = 0;

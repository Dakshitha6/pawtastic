"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Star,
  Heart,
  Scissors,
  Stethoscope,
  GraduationCap,
  Home,
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const services = [
  {
    title: "Professional Dog Training",
    description: "Expert training tailored to your dog's needs",
    icon: <GraduationCap className="w-10 h-10 text-primary" />,
    features: [
      "Behavior modification",
      "Obedience training",
      "Puppy training",
      "Group classes",
    ],
    price: "From $50/session",
  },
  {
    title: "Veterinary Care",
    description: "Comprehensive healthcare for your furry friend",
    icon: <Stethoscope className="w-10 h-10 text-primary" />,
    features: [
      "Regular check-ups",
      "Vaccinations",
      "Emergency care",
      "Dental services",
    ],
    price: "Consultation from $75",
  },
  {
    title: "Professional Grooming",
    description: "Keep your pet looking and feeling their best",
    icon: <Scissors className="w-10 h-10 text-primary" />,
    features: [
      "Bath and brush",
      "Hair trimming",
      "Nail clipping",
      "Ear cleaning",
    ],
    price: "From $45/session",
  },
  {
    title: "Pet Boarding",
    description: "A home away from home for your pet",
    icon: <Home className="w-10 h-10 text-primary" />,
    features: [
      "24/7 supervision",
      "Climate controlled facility",
      "Daily exercise",
      "Individual attention",
    ],
    price: "From $35/night",
  },
];

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Licensed Professionals",
    description: "All our staff are certified and experienced",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Quality Service",
    description: "Premium care for your beloved pets",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Loving Care",
    description: "We treat your pets like family",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-6">
              Our Pet Care Services
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8"
            >
              Comprehensive care solutions for your beloved pets, delivered by
              experienced professionals
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {service.icon}
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{service.price}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Why Choose Our Services?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              We provide top-quality pet care services with a focus on your
              pet's well-being and happiness
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mb-8"
            >
              Contact us today to schedule a service or learn more about how we
              can help your pet
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button size="lg" className="bg-primary text-primary-foreground">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

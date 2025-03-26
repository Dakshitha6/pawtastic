"use client";

import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/parallax-scroll";

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-20">
      {/* About Us Section */}
      <ParallaxSection>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">About Pawtastic</h1>
          <p className="text-lg text-muted-foreground mb-8">
            At Pawtastic, we believe every dog deserves a loving home. Our
            mission is to connect responsible pet owners with their perfect
            furry companions while ensuring the highest standards of animal
            welfare and adoption practices.
          </p>
        </motion.section>
      </ParallaxSection>

      {/* Available Breeds Section */}
      <ParallaxSection>
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Available Breeds
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breeds.map((breed) => (
              <motion.div
                key={breed.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{breed.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {breed.description}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>Size: {breed.size}</li>
                  <li>Exercise Needs: {breed.exercise}</li>
                  <li>Good with: {breed.goodWith}</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Adoption Process Section */}
      <ParallaxSection>
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Adoption Process
          </h2>
          <div className="space-y-8">
            {adoptionSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection>
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <p className="text-muted-foreground mb-4">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}

const breeds = [
  {
    name: "Labrador Retriever",
    description: "Friendly and outgoing, perfect family companions",
    size: "Large",
    exercise: "High",
    goodWith: "Families, other pets, children",
  },
  {
    name: "German Shepherd",
    description: "Intelligent and loyal, excellent guard dogs",
    size: "Large",
    exercise: "High",
    goodWith: "Families, experienced owners",
  },
  {
    name: "French Bulldog",
    description: "Adaptable and charming apartment dwellers",
    size: "Small",
    exercise: "Moderate",
    goodWith: "Singles, families, seniors",
  },
];

const adoptionSteps = [
  {
    title: "Browse Available Dogs",
    description:
      "Explore our selection of available dogs and find your perfect match based on lifestyle, space, and preferences.",
  },
  {
    title: "Submit Application",
    description:
      "Fill out our comprehensive adoption application form with your details and preferences.",
  },
  {
    title: "Home Check",
    description:
      "We'll schedule a visit to ensure your home is ready for your new furry friend.",
  },
  {
    title: "Meet & Greet",
    description:
      "Spend time with your chosen dog to ensure you're a perfect match.",
  },
  {
    title: "Finalize Adoption",
    description:
      "Complete the necessary paperwork and welcome your new family member home!",
  },
];

const testimonials = [
  {
    content:
      "Finding Max through Pawtastic was the best decision we ever made. The adoption process was smooth, and the team was incredibly supportive throughout.",
    name: "Sarah Johnson",
    location: "New York, NY",
  },
  {
    content:
      "As first-time dog owners, we appreciated how thorough and helpful the Pawtastic team was. Our Luna is the perfect addition to our family!",
    name: "Michael & Emily Chen",
    location: "San Francisco, CA",
  },
  {
    content:
      "The home check and meeting process helped ensure we found the right match. Buddy has been with us for a year now, and we couldn't be happier!",
    name: "David Williams",
    location: "Chicago, IL",
  },
  {
    content:
      "The breed recommendations were spot-on! Our apartment-friendly French Bulldog is everything we hoped for and more.",
    name: "Lisa Martinez",
    location: "Miami, FL",
  },
];

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Button } from "@/components/ui/button";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export function HeroSection() {
  return (
    <div className="bg-background py-16">
      <div className="container flex flex-col md:flex-row items-center gap-8">
        {/* Left content - Text and CTA */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1
            className={`text-5xl md:text-6xl font-bold tracking-tight ${playfair.className}`}
          >
            Find Your Perfect
            <span className="text-sky-500 dark:text-sky-400"> Companion</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md font-sans">
            Browse through our selection of lovely dogs looking for their
            forever homes. Each with their own unique personality and charm.
          </p>
          <div className="pt-4">
            <Link href="/dogs">
              <Button
                size="lg"
                className="rounded-full px-8 bg-gray-900 hover:bg-black text-white"
              >
                Browse Dogs
              </Button>
            </Link>
          </div>
        </div>

        {/* Right content - Image with circular background */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {/* Pastel circular background */}
            <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/20 -z-10 transform scale-[0.95]"></div>

            {/* Main large circle */}
            <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-sky-400 dark:bg-amber-900/20 flex items-center justify-center">
              {/* Dog image */}
              <div className="relative w-[520px] h-[520px] md:w-[600px] md:h-[600px]">
                <Image
                  src="/dog_hero_section.png"
                  alt="Happy dog"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Decorative small circles */}
            <div className="absolute top-[10%] right-[5%] w-12 h-12 rounded-full bg-yellow-300 dark:bg-pink-900/20"></div>
            <div className="absolute bottom-[15%] left-[10%] w-16 h-16 rounded-full bg-orange-500 dark:bg-green-900/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

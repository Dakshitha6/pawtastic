"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative w-40 h-40">
        {/* Paw prints circle animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 45}deg) translateY(-40px)`,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
                <path d="M50 5C55.5 5 60 9.5 60 15C60 20.5 55.5 25 50 25C44.5 25 40 20.5 40 15C40 9.5 44.5 5 50 5ZM65 25C70.5 25 75 29.5 75 35C75 40.5 70.5 45 65 45C59.5 45 55 40.5 55 35C55 29.5 59.5 25 65 25ZM35 25C40.5 25 45 29.5 45 35C45 40.5 40.5 45 35 45C29.5 45 25 40.5 25 35C25 29.5 29.5 25 35 25ZM50 35C55.5 35 60 39.5 60 45C60 50.5 55.5 55 50 55C44.5 55 40 50.5 40 45C40 39.5 44.5 35 50 35Z" />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Bouncing puppy in the middle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 fill-primary-foreground"
            >
              <path d="M35 20C40.5 20 45 24.5 45 30C45 35.5 40.5 40 35 40C29.5 40 25 35.5 25 30C25 24.5 29.5 20 35 20ZM65 20C70.5 20 75 24.5 75 30C75 35.5 70.5 40 65 40C59.5 40 55 35.5 55 30C55 24.5 59.5 20 65 20ZM20 40C25.5 40 30 44.5 30 50C30 55.5 25.5 60 20 60C14.5 60 10 55.5 10 50C10 44.5 14.5 40 20 40ZM80 40C85.5 40 90 44.5 90 50C90 55.5 85.5 60 80 60C74.5 60 70 55.5 70 50C70 44.5 74.5 40 80 40ZM50 45C63.8 45 75 56.2 75 70C75 83.8 63.8 95 50 95C36.2 95 25 83.8 25 70C25 56.2 36.2 45 50 45Z" />
            </svg>
          </div>
        </motion.div>
      </div>
      <motion.p
        className="absolute mt-32 text-lg font-medium text-muted-foreground"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Fetching pawtastic content...
      </motion.p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      initial={false}
      animate={{
        backgroundColor: isDark ? "rgb(17, 17, 17)" : "rgb(255, 255, 255)",
        borderColor: isDark ? "rgb(38, 38, 38)" : "rgb(229, 229, 229)",
      }}
      className="relative inline-flex h-[36px] w-[72px] items-center rounded-full border-2 px-1"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary"
        animate={{
          x: isDark ? "32px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-primary-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
}

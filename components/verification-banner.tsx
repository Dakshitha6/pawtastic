"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function VerificationBanner() {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Only show for authenticated users with unverified emails
  if (!user || user.emailVerified || dismissed) {
    return null;
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800">
      <div className="container py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">
            Please verify your email to unlock all features.
          </span>
          <Link href="/auth/verify-email" className="ml-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
            >
              Verify now
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}

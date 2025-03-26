"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  const { user, sendVerificationEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    // If user is already verified, go to home or redirect
    if (user?.emailVerified) {
      router.push(redirect);
    }

    // If no user, go to login
    if (!user) {
      router.push("/auth/login");
    }

    // Store redirect in session storage for later use
    if (redirect !== "/" && typeof window !== "undefined") {
      sessionStorage.setItem("postVerifyRedirect", redirect);
    }
  }, [user, router, redirect]);

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      setEmailSent(true);
      setError("");
      setCountdown(60);
    } catch (error) {
      setError("Failed to send verification email. Please try again.");
    }
  };

  const handleContinue = () => {
    router.push(redirect);
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We've sent a verification email to {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Verification recommended</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Please check your email and click on the verification link to
              complete your registration. Verifying your email helps secure your
              account and unlocks all features.
            </p>
          </div>

          {emailSent && (
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Email sent!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A new verification email has been sent to your inbox. It may
                take a few minutes to arrive.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            onClick={handleResendEmail}
            disabled={countdown > 0}
          >
            {countdown > 0
              ? `Resend Email (${countdown}s)`
              : "Resend Verification Email"}
          </Button>

          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Want to continue without verifying?
            </p>
            <Button
              variant="outline"
              onClick={handleContinue}
              className="flex items-center gap-1"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

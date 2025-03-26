"use client";

import { useEffect, useState } from "react";
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
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function VerifyActionPage() {
  const { verifyEmail, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/");

  // Get the action code from URL
  const actionCode = searchParams.get("oobCode");

  useEffect(() => {
    // Check if there's a saved redirect URL
    if (typeof window !== "undefined") {
      const savedRedirect = sessionStorage.getItem("postVerifyRedirect");
      if (savedRedirect) {
        setRedirectUrl(savedRedirect);
        // Clear it after reading
        sessionStorage.removeItem("postVerifyRedirect");
      }
    }

    if (!actionCode) {
      setStatus("error");
      setError(
        "Invalid verification link. The link may have expired or already been used."
      );
      return;
    }

    const verifyAction = async () => {
      try {
        await verifyEmail(actionCode);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        setError(
          error.message ||
            "Failed to verify email. The link may have expired or already been used."
        );
      }
    };

    verifyAction();
  }, [actionCode, verifyEmail]);

  const handleContinue = () => {
    if (status === "success") {
      router.push(redirectUrl);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {status === "loading" && "Verifying your email address..."}
            {status === "success" && "Your email has been verified!"}
            {status === "error" && "Verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-6">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-center text-sm text-muted-foreground">
                Please wait while we verify your email address
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-center text-muted-foreground">
                Thank you! Your email has been verified successfully. You now
                have full access to all features.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue} disabled={status === "loading"}>
            {status === "success" ? "Continue" : "Back to Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

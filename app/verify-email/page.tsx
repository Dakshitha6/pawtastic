"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { resendVerificationEmail, user, refreshUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Check verification status on mount and when user changes
  useEffect(() => {
    if (user?.emailVerified) {
      toast({
        title: "Email verified",
        description: "Your email has been verified successfully.",
      });
      router.push("/dogs");
    }
  }, [user, router, toast]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await resendVerificationEmail();
      toast({
        title: "Success",
        description: "Verification email has been sent",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send verification email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    setIsCheckingStatus(true);
    try {
      await refreshUser();
      if (user?.emailVerified) {
        toast({
          title: "Email verified",
          description: "Your email has been verified successfully.",
        });
        router.push("/dogs");
      } else {
        toast({
          title: "Not verified",
          description:
            "Your email is not verified yet. Please check your inbox and click the verification link.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not check verification status",
        variant: "destructive",
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Check your email
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent you a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Click the link in the email to verify your account.</p>
            <p>If you don&apos;t see the email, check your spam folder.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="w-full"
              onClick={checkVerificationStatus}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Check verification status
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendEmail}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Resend verification email
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Need help?{" "}
            <a
              href="mailto:support@pawtastic.com"
              className="text-primary hover:underline font-medium"
            >
              Contact support
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

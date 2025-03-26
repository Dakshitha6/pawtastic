"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/verify",
];

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [hasShownVerification, setHasShownVerification] = useState(false);

  // Set isClient to true on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Wait until auth is initialized
    if (!isClient || loading) return;

    // Check if the current route is public
    const isPublicRoute = publicRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    // If user is not authenticated and the route is not public, redirect to login
    if (!user && !isPublicRoute) {
      // Add the current path as a redirect parameter
      const redirectPath = encodeURIComponent(pathname || "/");
      router.push(`/auth/login?redirect=${redirectPath}`);
      return;
    }

    // Only redirect to verification page if user just signed up/logged in
    // and hasn't been shown the verification page yet
    if (
      user &&
      !user.emailVerified &&
      !hasShownVerification &&
      !pathname?.startsWith("/auth/verify-email") &&
      !pathname?.startsWith("/auth/verify")
    ) {
      setHasShownVerification(true);
      router.push("/auth/verify-email");
    }
  }, [user, loading, router, pathname, isClient, hasShownVerification]);

  // Show loading state while checking authentication
  if (loading || !isClient) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // For public routes, always render
  if (publicRoutes.some((route) => pathname?.startsWith(route))) {
    return <>{children}</>;
  }

  // For private routes, render if authenticated (regardless of email verification)
  if (user) {
    return <>{children}</>;
  }

  // Default loading state while redirecting
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

/** @jsxImportSource react */
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the token from URL query parameters
    const token = searchParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Log success for debugging
      console.log("Token stored successfully:", token);

      // Redirect to home page
      router.push("/");
    } else {
      // If no token is found, redirect to home anyway or show an error
      console.warn("No token found in URL parameters");
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}

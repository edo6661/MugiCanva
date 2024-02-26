"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import TempLoading from "@/components/auth/TempLoading";

interface ConvexProviderProps {
  children: React.ReactNode;
}

const CONVEXURL = process.env.NEXT_PUBLIC_CONVEX_URL;

const convex = new ConvexReactClient(CONVEXURL!);

export default function ConvexProvider({ children }: ConvexProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <TempLoading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

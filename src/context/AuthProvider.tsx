"use client";

import { SessionProvider } from "next-auth/react";

// Fixing the props destructuring and type declaration
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

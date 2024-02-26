import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexProvider from "@/providers/ConvexProvider";
import { Toaster } from "@/components/ui/sonner";
import { LoaderIcon } from "lucide-react";
import ModalProvider from "@/providers/ModalProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexProvider>
          <Toaster closeButton position="bottom-right" />
          <ModalProvider />
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}

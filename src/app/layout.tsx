import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import PrivateRouteMiddleware from "@/middlewares/private-route-middleware";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Toaster position="top-center" />
          
          <PrivateRouteMiddleware>
            {children}
          </PrivateRouteMiddleware>
        </AuthContextProvider>
      </body>
    </html>
  );
}

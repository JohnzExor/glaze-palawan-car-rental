import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/session-provider";

export const metadata: Metadata = {
  title: "Glaze Palawan Car Rental",
  description:
    "Rent your perfect ride with Glaze Palawan Car Rental and discover the beauty of Puerto Princesa.",
};

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

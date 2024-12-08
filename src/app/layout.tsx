import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/session-provider";
import { ThemeProvider } from "@/providers/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

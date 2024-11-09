import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { TanstackProvider } from "@/components/TanstackQueryProvider";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dandadan",
  description: "Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <TanstackProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </TanstackProvider>
        </body>
    </html>
  );
}

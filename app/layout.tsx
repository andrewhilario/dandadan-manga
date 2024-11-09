import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { TanstackProvider } from "@/components/TanstackQueryProvider";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dandadan",
  description: "Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure.",
  keywords: "dandadan, manga, supernatural, ghosts, aliens, adventure",
  authors: [{ name: "Yukinobu Tatsu" }],
  openGraph: {
    title: "Dandadan Manga",
    description: "Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure.",
    type: "website",
    url: "https://dandadan-manga.vercel.app/",
    images: [
      {
        url: "https://dandadan-manga.vercel.app/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandadan Manga",
    description: "Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure.",
    images: ["https://dandadan-manga.vercel.app/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <TanstackProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

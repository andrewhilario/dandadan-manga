import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { TanstackProvider } from "@/components/TanstackQueryProvider";
import Head from 'next/head';


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
      <Head>
        <meta name="description" content="Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure." />
        <meta name="keywords" content="dandadan, manga, supernatural, ghosts, aliens, adventure" />
        <meta name="author" content="AINZ" />
        <meta property="og:title" content="Dandadan Manga" />
        <meta property="og:description" content="Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dandadan-manga.vercel.app/" />
        <meta property="og:image" content="https://dandadan-manga.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dandadan Manga" />
        <meta name="twitter:description" content="Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure." />
        <meta name="twitter:image" content="https://dandadan-manga.vercel.app//twitter-image.jpg" />
      </Head>
      
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

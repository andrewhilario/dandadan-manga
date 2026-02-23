import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { TanstackProvider } from "@/components/TanstackQueryProvider";
import { Analytics } from '@vercel/analytics/next';

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dandadan-manga.vercel.app"),
  title: {
    default: "Dandadan Manga | Read Latest Chapters Online Free",
    template: "%s | Dandadan Manga"
  },
  description: "Read the latest Dandadan manga chapters online for free. Follow Momo Ayase and Ken Takakura's supernatural adventures with ghosts and aliens. New chapters every Monday. Fast loading, mobile-friendly.",
  keywords: [
    "dandadan manga",
    "read dandadan online",
    "dandadan chapters",
    "momo ayase",
    "ken takakura",
    "yukinobu tatsu",
    "supernatural manga",
    "weekly shonen jump manga",
    "free manga reading",
    "dandadan new chapter"
  ],
  authors: [{ name: "Yukinobu Tatsu" }],
  creator: "Yukinobu Tatsu",
  publisher: "Shogakukan",
  category: "manga",
  alternates: {
    canonical: "https://dandadan-manga.vercel.app",
    languages: {
      'en-US': 'https://dandadan-manga.vercel.app'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  openGraph: {
    title: "Dandadan Manga - Read Latest Supernatural Action Series Online",
    description: "Experience the thrilling supernatural world of Dandadan manga. Follow high school students battling ghosts and aliens in this critically acclaimed series. New chapters released weekly. Start reading now!",
    type: "website",
    url: "https://dandadan-manga.vercel.app/",
    siteName: "Dandadan Manga Official",
    locale: "en_US",
    images: [
      {
        url: "https://dandadan-manga.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dandadan Manga Cover featuring Momo Ayase and Ken Takakura"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandadan Manga | Latest Chapters & Updates",
    description: "Read the latest Dandadan manga chapters online. Join the supernatural adventure with weekly updates, high-quality scans, and seamless reading experience.",
    site: "@dandadan_manga",
    creator: "@yukinobu_tatsu",
    images: [{
      url: "https://dandadan-manga.vercel.app/twitter-image.jpg",
      alt: "Dandadan Manga Latest Chapter Cover"
    }]
  },
  verification: {
    google: "I3Dcq2vmdVQs9Dz0EqeDRjlpd8y9NAPSGVua2EDmkkY"
  }
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
            <footer className="bg-gray-900 border-t border-gray-800 py-4 text-center">
              <a
                href="https://www.buymeacoffee.com/ainzzuu"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=ainzzuu&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                  alt="Buy Me A Coffee"
                  className="h-9 mx-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </footer>
          </ThemeProvider>
        </TanstackProvider>
        <Analytics />
      </body>
    </html>
  );
}

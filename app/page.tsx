import { ChapterList } from "@/components/chapter-list";
import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dandadan Manga | Read Latest Chapters Online Free",
  description:
    "Read the latest Dandadan manga chapters online for free. Follow Momo Ayase and Ken Takakura in a supernatural adventure with ghosts and aliens. New chapters every Monday.",
  alternates: { canonical: "https://dandadan-manga.vercel.app" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://dandadan-manga.vercel.app/#website",
      name: "Dandadan Manga",
      url: "https://dandadan-manga.vercel.app",
      description:
        "Read Dandadan manga online for free. Latest chapters updated every Monday.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://dandadan-manga.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://dandadan-manga.vercel.app/#organization",
      name: "Dandadan Manga",
      url: "https://dandadan-manga.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://dandadan-manga.vercel.app/favicon.png"
      }
    }
  ]
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Create a Navbar for a manga website add a simple logo with a word "Dandadan" */}
      <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-4">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src="/favicon.png"
                    alt="Dandadan Logo"
                    width={40}
                    height={40}
                  />
                </div>

                <span className="text-2xl font-bold text-white">
                  Dandadan Manga
                </span>
              </div>
            </a>
            <a
              href="https://www.buymeacoffee.com/ainzzuu"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=ainzzuu&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                alt="Buy Me A Coffee"
                className="h-8"
              />
            </a>
          </div>
        </div>
      </nav>
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
              Welcome to Dandadan Manga
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover the supernatural world of Dandadan, where ghosts and
              aliens collide in an epic adventure.
            </p>
          </div>
        </div>
      </header>
      <section className="w-[100%] xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Latest Chapters
        </h2>
        <ChapterList />
      </section>
    </main>
  );
}

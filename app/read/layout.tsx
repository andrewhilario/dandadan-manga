"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReadLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <main className="flex flex-col">
      <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
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
                  <h1 className="text-2xl font-bold text-white">
                    Dandadan Manga
                  </h1>
                </div>
              </a>
              <div className="flex items-center gap-3">
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
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
}

"use client"

import { usePathname, useRouter } from "next/navigation"

export default function ReadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const isReadPage = pathname.startsWith("/read")

  return (
    <main className="flex flex-col">
      <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  Dandadan
                </h1>
              </div>
              {isReadPage && (
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
              )}
            </div>
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
              Discover the supernatural world of Dandadan, where ghosts and aliens collide in an epic adventure.
            </p>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}

import { Metadata } from "next";

const BASE_URL = "https://dandadan-manga.vercel.app";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // id is like "chapter-225" — extract the number
  const chapterNum = id.replace(/[^0-9.]/g, "");
  const chapterLabel = chapterNum ? `Chapter ${chapterNum}` : id;
  const canonical = `${BASE_URL}/read/${id}`;

  return {
    title: `Dandadan ${chapterLabel} | Read Online Free`,
    description: `Read Dandadan ${chapterLabel} online for free. High-quality manga pages with fast loading and mobile-friendly layout. New chapters every Monday.`,
    alternates: {
      canonical
    },
    openGraph: {
      title: `Dandadan ${chapterLabel} – Read Online Free`,
      description: `Follow the supernatural adventure of Dandadan in ${chapterLabel}. Read online for free with crisp scans and no ads.`,
      url: canonical,
      type: "article",
      siteName: "Dandadan Manga",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Dandadan ${chapterLabel}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Dandadan ${chapterLabel} | Read Online Free`,
      description: `Read Dandadan ${chapterLabel} online for free. Updated every Monday.`,
      images: [`${BASE_URL}/og-image.jpg`]
    }
  };
}

export default function ChapterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

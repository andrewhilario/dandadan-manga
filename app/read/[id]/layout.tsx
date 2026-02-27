import { Metadata } from "next";
import Script from "next/script";
import { BASE_URL } from "@/constants/api";

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
    description: `Read Dandadan ${chapterLabel} online for free in English. High-quality manga pages with fast loading and mobile-friendly layout. New chapters every Monday on dandadan-manga.online.`,
    keywords: [
      `dandadan ${chapterLabel.toLowerCase()}`,
      `dandadan chapter ${chapterNum}`,
      `read dandadan ${chapterLabel.toLowerCase()} online`,
      `dandadan ${chapterLabel.toLowerCase()} english`,
      "dandadan manga",
      "read dandadan free"
    ],
    alternates: {
      canonical
    },
    openGraph: {
      title: `Dandadan ${chapterLabel} – Read Online Free`,
      description: `Follow the supernatural adventure of Dandadan in ${chapterLabel}. Read online for free in English with crisp scans.`,
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

export default async function ChapterLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapterNum = id.replace(/[^0-9.]/g, "");
  const chapterLabel = chapterNum ? `Chapter ${chapterNum}` : id;
  const canonical = `${BASE_URL}/read/${id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dandadan Manga",
            item: BASE_URL
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Dandadan ${chapterLabel}`,
            item: canonical
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${canonical}/#article`,
        headline: `Dandadan ${chapterLabel}`,
        description: `Read Dandadan ${chapterLabel} online for free in English. Follow Momo Ayase and Ken Takakura in this supernatural action manga.`,
        url: canonical,
        isPartOf: {
          "@id": `${BASE_URL}/#website`
        },
        isAccessibleForFree: true,
        author: {
          "@type": "Person",
          name: "Yukinobu Tatsu"
        },
        publisher: {
          "@type": "Organization",
          name: "Dandadan Manga",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/favicon.png`
          }
        },
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630
        },
        inLanguage: "en",
        breadcrumb: {
          "@id": `${canonical}/#breadcrumb`
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="chapter-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

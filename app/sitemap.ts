import { MetadataRoute } from "next";
import { API_URL, BASE_URL } from "@/constants/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let chapterEntries: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_URL}/info?id=dandadan`, {
      next: { revalidate: 3600 }
    });
    const data = await res.json();

    if (data?.chapters) {
      chapterEntries = data.chapters.map(
        (chapter: { id: string; releasedDate: string }) => {
          const chapterId = chapter.id.split("dandadan")[1];
          return {
            url: `${BASE_URL}/read${chapterId}`,
            lastModified: new Date(chapter.releasedDate),
            changeFrequency: "never" as const,
            priority: 0.7
          };
        }
      );
    }
  } catch {
    // Silently fail — sitemap still returns the homepage entry
  }

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    ...chapterEntries
  ];
}

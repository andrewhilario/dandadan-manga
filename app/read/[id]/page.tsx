"use client";

import { API_URL } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowUp, Pause, Play } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChapterImage {
  img: string;
  page: number;
  headerForImage: {
    Referer: string;
  };
}

interface Chapter {
  id: string;
  title: string;
  releasedDate: string;
}

interface ChapterReadResponse {
  images: ChapterImage[];
  success: boolean;
}

export default function ReadChapter() {
  const params = useParams();
  const router = useRouter();
  const id = params!.id as string;
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(() => {
    const savedInterval = localStorage.getItem("scrollInterval");
    console.log(savedInterval);
    return savedInterval ? parseInt(savedInterval) : 5000;
  });

  const { data: chapterList } = useQuery({
    queryKey: ["chapters"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/info/132029?provider=mangahere`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return {
        ...data,
        chapters: data.chapters.reverse()
      };
    }
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["chapter", id],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/read?chapterId=dandadan/${id}&provider=mangahere`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!data) return;

    let scrollTimer: NodeJS.Timeout;

    if (isAutoScrolling && data.length && currentImageIndex < data.length) {
      scrollTimer = setInterval(() => {
        const imageElements = document.querySelectorAll("img");
        if (imageElements[currentImageIndex]) {
          imageElements[currentImageIndex].scrollIntoView({
            behavior: "smooth"
          });
          setCurrentImageIndex((prev) => {
            if (prev + 1 >= data.length) {
              setIsAutoScrolling(false);
              return prev;
            }
            return prev + 1;
          });
        }
      }, scrollInterval);
    }

    return () => {
      if (scrollTimer) {
        clearInterval(scrollTimer);
      }
    };
  }, [isAutoScrolling, currentImageIndex, data, scrollInterval]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
    if (!isAutoScrolling) {
      setCurrentImageIndex(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentChapterIndex = chapterList?.chapters.findIndex(
    (chapter: Chapter) => chapter.id === `dandadan/${id}`
  );

  const hasNextChapter =
    currentChapterIndex !== undefined && currentChapterIndex > 0;

  const hasPreviousChapter =
    currentChapterIndex !== undefined &&
    currentChapterIndex < chapterList?.chapters.length + 1;

  const handleNextChapter = () => {
    if (hasNextChapter && chapterList) {
      const nextChapter = chapterList.chapters[currentChapterIndex - 1];
      const nextChapterId = nextChapter.id.split("dandadan")[1];
      router.push(`/read/${nextChapterId}`);
    }
  };

  const handlePreviousChapter = () => {
    if (hasPreviousChapter && chapterList) {
      const previousChapter = chapterList.chapters[currentChapterIndex + 1];
      const previousChapterId = previousChapter.id.split("dandadan")[1];
      console.log(previousChapterId);
      router.push(`/read/${previousChapterId}`);
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      5000,
      Math.min(60000, parseInt(e.target.value) * 1000)
    );
    setScrollInterval(value);
    localStorage.setItem("scrollInterval", value.toString());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8 items-center bg-gray-900 h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-white" />
        <span className="ml-2 text-white">Loading chapter...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-gray-900">Error loading chapter</div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-4 text-white bg-gray-900">No images available</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 items-center">
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 text-white text-center rounded-full hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
        <div
          className={`bg-gray-800 p-3 rounded-lg shadow-lg flex flex-col gap-2 transition-all duration-300 ${
            isAutoScrolling ? "w-full p-1" : "w-48 h-auto"
          }`}
        >
          {!isAutoScrolling && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={60}
                value={scrollInterval / 1000}
                onChange={handleIntervalChange}
                className="w-16 px-2 py-1 bg-gray-700 text-white rounded-md"
                aria-label="Scroll interval in seconds"
              />
              <span className="text-white text-sm">sec</span>
            </div>
          )}
          <button
            onClick={toggleAutoScroll}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            aria-label={
              isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"
            }
          >
            {isAutoScrolling ? <Pause size={18} /> : <Play size={18} />}
            {!isAutoScrolling && (
              <span className="text-sm">
                {isAutoScrolling ? "Pause" : "Play"}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {chapterList && (
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Chapter{" "}
            {chapterList.chapters[currentChapterIndex]?.title
              .split("Ch.")
              .pop()}
          </h2>
        )}
        <div className="space-y-4">
          {data.map((image: ChapterImage) => (
            <div key={image.page} className="w-full flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/fetchImage?imgUrl=${encodeURIComponent(
                  image.img
                )}&referer=${encodeURIComponent(image.headerForImage.Referer)}`}
                alt={`Page ${image.page}`}
                className="max-w-full xl:w-[72%] h-auto "
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{
                  backgroundImage: `url(/api/fetchImage?imgUrl=${encodeURIComponent(
                    image.img
                  )}&referer=${encodeURIComponent(
                    image.headerForImage.Referer
                  )})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between gap-4">
          {hasPreviousChapter && chapterList && (
            <button
              onClick={handlePreviousChapter}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Chapter {chapterList.chapters[currentChapterIndex + 1]?.title}
            </button>
          )}
          {hasNextChapter && chapterList && (
            <button
              onClick={handleNextChapter}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Chapter {chapterList.chapters[currentChapterIndex - 1]?.title} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"

import { API_URL } from "@/constants/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface Chapter {
  id: string
  title: string
  releasedDate: string
}

interface ChapterResponse {
  chapters: Chapter[]
  success: boolean
}

export function ChapterList() {
  const [visibleChapters, setVisibleChapters] = useState(20)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['chapters'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/info/132029?provider=mangahere`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      return {
        ...data,
        chapters: data.chapters.reverse()
      }
    }
  })

  if (isLoading) {
    return <div className="flex justify-center p-8 items-center">
        <Loader2 className="animate-spin h-10 w-10" />
        <span className="ml-2">Loading chapters...</span>
    </div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading chapters</div>
  }

  if (!data?.chapters?.length) {
    return <div className="p-4">No chapters available</div>
  }

  const sortedChapters = [...data.chapters].sort((a, b) => {
    const aNum = parseInt(a.title.split('.')[1])
    const bNum = parseInt(b.title.split('.')[1])
    return sortOrder === 'asc' ? aNum - bNum : bNum - aNum
  })

  const displayedChapters = sortedChapters.slice(0, visibleChapters)

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="w-full mx-auto xl:p-4">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chapters</h2>
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            {sortOrder === 'asc' ? 'Sort Newest First' : 'Sort Oldest First'}
          </button>
        </div>
        <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-white font-medium">
            📅 New chapters release every Monday! Stay tuned for weekly updates.
          </p>
        </div>
      </div>
      <div className="space-y-4 w-full">
        {displayedChapters.map((chapter: Chapter ) => (
          <div
            key={chapter.id}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => window.location.href = `/read/${chapter.id.split("dandadan")[1]}`}
          >
            <div>
              <h3 className="text-lg font-medium hover:underline transition-all ease-in-out duration-500">Chapter {chapter.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{chapter.title}</p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(chapter.releasedDate).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
      
      {visibleChapters < data.chapters.length && (
        <button
          onClick={() => setVisibleChapters(prev => prev + 20)}
          className="mt-6 w-full py-3 px-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
        >
          Show More
        </button>
      )}
    </div>
  )
}

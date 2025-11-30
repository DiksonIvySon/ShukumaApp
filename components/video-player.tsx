"use client"

import { useState } from "react"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  duration?: string
}

export function VideoPlayer({ videoUrl, title, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-800">
      {/* Video Container */}
      <div className="relative bg-black aspect-video flex items-center justify-center group">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Info */}
      <div className="bg-gray-900 px-4 py-3">
        <p className="text-white font-semibold text-sm mb-1">{title}</p>
        {duration && <p className="text-gray-400 text-xs">Duration: {duration}</p>}
      </div>
    </div>
  )
}

"use client"

import { Brain, Zap, MessageCircle, Shuffle } from "lucide-react"

export default function FatThinking() {
  return (
    <div className="flex justify-center my-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl px-6 py-4 border border-gray-700 shadow-lg">
        <div className="flex items-center space-x-3">
          <Shuffle className="h-4 w-4 text-purple-400 animate-spin" />

          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <Brain className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">FatGPT is deciding how to respond...</span>
            <MessageCircle className="h-4 w-4 animate-pulse" />
          </div>

          <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

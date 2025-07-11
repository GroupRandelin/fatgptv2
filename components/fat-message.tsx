"use client"

import type { Message } from "@/lib/types"
import { responseTypes } from "@/lib/response-types"
import { User, Zap } from 'lucide-react'

interface FatMessageProps {
  message: Message
  isLatest?: boolean
}

export default function FatMessage({ message, isLatest }: FatMessageProps) {
  if (message.isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="bg-blue-600 rounded-full p-1.5 mb-1">
            <User className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    )
  }

  const responseType = responseTypes[message.personalityId]
  if (!responseType) return null

  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
        <div className="relative">
          <div className="text-2xl bg-gray-800 rounded-full p-2.5 border border-gray-700 shadow-lg">
            🧁
          </div>
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-1">
            <Zap className="h-3 w-3 text-white" />
          </div>
        </div>

        <div className="flex-1">
          {/* Message bubble - no mode indicator */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl rounded-tl-md px-4 py-3 border border-gray-700 shadow-lg">
            <div className="text-xs text-gray-500 mb-2">
              FatGPT • {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <p className="text-sm text-gray-100">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { RefreshCw, Zap } from "lucide-react"

interface FatHeaderProps {
  onReset?: () => void
}

export default function FatHeader({ onReset }: FatHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />

      <div className="relative flex items-center justify-between p-4">
        {/* Branding */}
        <div className="text-sm text-gray-400">
          Powered by <span className="text-white font-medium">Cake Randelin</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap className="h-6 w-6 text-yellow-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              FatGPT
            </h1>
            <Zap className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-sm text-gray-400">Unpredictably Honest AI</p>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          title="Reset conversation"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

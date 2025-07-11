"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Dice6 } from "lucide-react"
import type { Message } from "@/lib/types"
import FatHeader from "./fat-header"
import FatMessage from "./fat-message"
import FatThinking from "./fat-thinking"

export default function FatChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleReset = () => {
    setMessages([])
    setInputValue("")
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      personalityId: "user",
      timestamp: new Date(),
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages.slice(-6),
        }),
      })

      const data = await response.json()

      if (data.responses) {
        const aiMessages: Message[] = data.responses.map((resp: { typeId: string; content: string; timestamp: string }) => ({
          id: `${Date.now()}-${resp.typeId}`,
          content: resp.content,
          personalityId: resp.typeId,
          timestamp: new Date(resp.timestamp),
          isUser: false,
        }))

        // Add AI responses with staggered timing for drama
        aiMessages.forEach((msg, index) => {
          setTimeout(() => {
            setMessages((prev) => [...prev, msg])
          }, index * 1200) // Slightly longer delay for suspense
        })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedPrompts = [
    "What's the best programming language?",
    "Should I quit my job?",
    "Is pineapple on pizza acceptable?",
    "How do I get rich quick?",
    "What's the meaning of life?",
    "Should I trust the government?",
    "Is AI going to replace humans?",
    "How do I find true love?",
  ]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <FatHeader onReset={handleReset} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <div className="text-8xl mb-6">🎲</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to FatGPT
            </h2>
            <p className="text-xl mb-2">The Unpredictably Honest AI</p>

            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Dice6 className="h-4 w-4 text-purple-400" />
                <p className="text-sm text-gray-500">Try one of these conversation starters:</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(prompt)}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs text-gray-300 border border-gray-700 transition-all hover:scale-105 hover:border-gray-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <FatMessage key={message.id} message={message} isLatest={index === messages.length - 1} />
        ))}

        {isLoading && <FatThinking />}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="flex space-x-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... I'll surprise you with my response 🎲"
              disabled={isLoading}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-2xl text-white font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>

        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Katos Tepe
          </p>
        </div>
      </div>
    </div>
  )
}

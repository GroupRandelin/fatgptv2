import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { responseTypes, getRandomResponseTypes } from "@/lib/response-types"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    // Randomly select which response types to use
    const selectedTypes = getRandomResponseTypes()
    console.log("Selected response types:", selectedTypes)

    // Generate responses from selected types
    const responses = await Promise.all(
      selectedTypes.map(async (typeId: string) => {
        const responseType = responseTypes[typeId]
        if (!responseType) return null

        // Build minimal context
        const context = conversationHistory
          .slice(-3)
          .map((msg: any) => `User: ${msg.content}`)
          .join("\n")

        const fullPrompt = `${responseType.systemPrompt}

${context ? `Recent context: ${context}` : ""}

User just asked: "${message}"

Respond as FatGPT in ${responseType.name.toLowerCase()} mode. Keep it SHORT (1-2 sentences max):`

        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: fullPrompt,
          maxTokens: 100,
          temperature: 0.9, // Higher temperature for more variety
        })

        return {
          typeId,
          content: text,
          timestamp: new Date(),
        }
      }),
    )

    const validResponses = responses.filter(Boolean)
    return Response.json({ responses: validResponses })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate responses" }, { status: 500 })
  }
}

export interface Message {
    id: string
    content: string
    personalityId: string
    timestamp: Date
    isUser?: boolean
  }
  
  export interface ChatState {
    messages: Message[]
    isLoading: boolean
  }
  
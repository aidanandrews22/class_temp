// src/types/chat.ts
export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface Chat {
    id: string;
    messages: Message[];
  }
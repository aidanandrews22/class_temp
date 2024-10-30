// src/mocks/chatData.ts
import { Message } from '../types/chat';

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello, how can I help you today?',
    role: 'assistant',
    timestamp: new Date(),
  },
  {
    id: '2',
    content: 'I need help with React',
    role: 'user',
    timestamp: new Date(),
  },
  {
    id: '3',
    content: `Here's a simple React example:
\`\`\`jsx
function Example() {
  return <div>Hello World!</div>;
}
\`\`\``,
    role: 'assistant',
    timestamp: new Date(),
  },
];
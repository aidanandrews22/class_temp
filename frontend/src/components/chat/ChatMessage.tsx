// src/components/chat/ChatMessage.tsx
import React from 'react';
import { Message } from '../../types/chat';
import { useLLMOutput } from '@llm-ui/react';
import { markdownLookBack } from '@llm-ui/markdown';
import { codeBlockLookBack, findCompleteCodeBlock, findPartialCodeBlock } from '@llm-ui/code';
import MarkdownMessage from './MarkdownMessage';
import CodeBlock from './CodeBlock';
import { BlockMatch } from '../../types/llm-ui';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isStreaming = false }) => {
  const { blockMatches } = useLLMOutput({
    llmOutput: message.content,
    blocks: [
      {
        component: CodeBlock,
        findCompleteMatch: findCompleteCodeBlock(),
        findPartialMatch: findPartialCodeBlock(),
        lookBack: codeBlockLookBack(),
      },
    ],
    fallbackBlock: {
      component: MarkdownMessage,
      lookBack: markdownLookBack(),
    },
    isStreamFinished: !isStreaming,
  });

  return (
    <div className={`chat-message ${message.role}`}>
      <div className="message-content">
        {blockMatches.map((blockMatch: BlockMatch, index: number) => {
          const Component = blockMatch.block.component;
          return <Component key={index} blockMatch={blockMatch} />;
        })}
      </div>
      <div className="message-timestamp">
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
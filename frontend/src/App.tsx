// src/App.tsx
import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Semester from './components/Semester';
import Legend from './components/Legend';
import ErrorMessage from './components/ErrorMessage';
import ChatWindow from './components/chat/ChatWindow';
import initialData from './initialData';
import { AppState } from './types';
import { Message } from './types/chat';
import './App.css';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialData);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragSourceId, setDragSourceId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you with your class schedule?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);

  const onDragStart = (start: any) => {
    setIsDragging(true);
    setDragSourceId(start.draggableId);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    setDragSourceId(null);

    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newState = { ...state };
    const sourceSemester = newState.semesters.find(sem => sem.id === source.droppableId);
    const destSemester = newState.semesters.find(sem => sem.id === destination.droppableId);

    if (sourceSemester && destSemester) {
      sourceSemester.courseIds.splice(source.index, 1);
      destSemester.courseIds.splice(destination.index, 0, draggableId);
      setState(newState);
    }
  };

  const maxSlots = Math.max(...state.semesters.map(sem => sem.courseIds.length));

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: String(Date.now()),
      content,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Add mock assistant response
    // In a real app, this would come from your AI service
    setTimeout(() => {
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        content: `I received your message: "${content}". This is a mock response.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="container">
        <h1>Class Schedule Planner</h1>
        <div className="timeline" id="semesters">
          {state.semesters.map((semester) => (
            <Semester
              key={semester.id}
              semester={semester}
              courses={semester.courseIds.map(id => state.courses[id])}
              setErrorMessage={setErrorMessage}
              maxSlots={maxSlots}
              isDragging={isDragging}
              dragSourceId={dragSourceId}
            />
          ))}
        </div>
        <Legend />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        
        {/* Chat Toggle Button */}
        <button 
          className="chat-toggle-button"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? '✕' : '💬'}
        </button>

        {isChatOpen && (
          <div className="chat-overlay">
            <ChatWindow 
              messages={messages} 
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default App;

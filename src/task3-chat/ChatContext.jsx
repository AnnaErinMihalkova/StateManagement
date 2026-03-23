import React, { createContext, useReducer, useContext } from 'react';

function chatReducer(state, action) {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, {
          id: Date.now(),
          author: action.author,
          text: action.text,
          timestamp: new Date().toLocaleTimeString("bg-BG", { hour: '2-digit', minute: '2-digit' }),
        }],
      };
    case 'CLEAR_CHAT':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    onlineUsers: ["Иван", "Мария"],
  });

  const sendMessage = (author, text) => {
    if (text.trim()) {
      dispatch({ type: 'SEND_MESSAGE', author, text });
    }
  };

  const clearChat = () => dispatch({ type: 'CLEAR_CHAT' });

  return (
    <ChatContext.Provider value={{
      messages: state.messages,
      onlineUsers: state.onlineUsers,
      sendMessage,
      clearChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat трябва да е в ChatProvider!");
  return ctx;
}

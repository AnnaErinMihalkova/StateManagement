import React, { useState } from 'react';
import { ChatProvider } from './ChatContext';
import { UserTab, MessageList, MessageInput, ChatStats } from './ChatComponents';
import { useSettings } from '../task2-settings/SettingsContext';

function Task3App() {
  const [activeUser, setActiveUser] = useState("Иван");
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2.5rem',
    background: isDark ? '#000' : '#f4f7f6',
    borderRadius: '24px',
    border: isDark ? '1px solid #222' : '1px solid #ddd',
    color: isDark ? '#eee' : '#333',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const headerStyle = {
    textAlign: 'center',
    color: isDark ? '#fff' : '#2c3e50',
    marginBottom: '2.5rem',
    fontSize: '2.2rem',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        {lang === 'bg' ? 'Мини чат стая' : 'Mini Chat Room'}
      </h2>
      <ChatProvider>
        <UserTab active={activeUser} onChange={setActiveUser} />
        <MessageList activeUser={activeUser} />
        <MessageInput author={activeUser} />
        <ChatStats />
      </ChatProvider>
    </div>
  );
}

export default Task3App;

import React, { useState } from 'react';
import { useChat } from './ChatContext';
import { useSettings } from '../task2-settings/SettingsContext';

export function UserTab({ active, onChange }) {
  const { onlineUsers } = useChat();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;
  
  const tabContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '1.5rem',
    borderBottom: isDark ? '1px solid #333' : '1px solid #ddd',
    paddingBottom: '15px',
    alignItems: 'center'
  };

  const buttonStyle = (user) => ({
    padding: '10px 24px',
    background: active === user ? (user === 'Иван' ? '#017ae0' : '#00bc89') : (isDark ? '#222' : '#f0f0f0'),
    color: active === user ? 'white' : (isDark ? '#888' : '#666'),
    border: active === user ? 'none' : (isDark ? '1px solid #333' : '1px solid #ddd'),
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={tabContainerStyle}>
      <span style={{ color: isDark ? '#666' : '#999', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {lang === 'bg' ? 'Пиши като:' : 'Chat as:'}
      </span>
      {onlineUsers.map(user => (
        <button 
          key={user} 
          style={buttonStyle(user)} 
          onClick={() => onChange(user)}
        >
          {user}
        </button>
      ))}
    </div>
  );
}

export function MessageList({ activeUser }) {
  const { messages } = useChat();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;
  
  const listStyle = {
    height: '350px',
    overflowY: 'auto',
    padding: '1.5rem',
    background: isDark ? '#0a0a0a' : '#fcfcfc',
    borderRadius: '16px',
    border: isDark ? '1px solid #222' : '1px solid #eee',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: isDark ? 'inset 0 2px 10px rgba(0,0,0,0.5)' : 'inset 0 2px 5px rgba(0,0,0,0.02)'
  };

  return (
    <div style={listStyle}>
      {messages.length === 0 ? (
        <div style={{ textAlign: 'center', color: isDark ? '#444' : '#ccc', marginTop: '130px' }}>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>💬 {lang === 'bg' ? 'Няма съобщения още.' : 'No messages yet.'}</p>
          <p style={{ fontSize: '0.9rem' }}>{lang === 'bg' ? 'Започнете разговора!' : 'Start the conversation!'}</p>
        </div>
      ) : (
        messages.map(m => {
          const isMe = m.author === activeUser;
          const authorColor = m.author === "Иван" ? "#017ae0" : "#00bc89";
          
          return (
            <div key={m.id} style={{
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              maxWidth: '75%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMe ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: isMe ? authorColor : (isDark ? '#1a1a1a' : '#ffffff'),
                color: isMe ? 'white' : (isDark ? '#eee' : '#333'),
                padding: '10px 18px',
                borderRadius: isMe ? '20px 20px 0 20px' : '20px 20px 20px 0',
                boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                border: isMe ? 'none' : (isDark ? `1px solid ${authorColor}44` : '1px solid #eee'),
                position: 'relative'
              }}>
                {!isMe && (
                  <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '4px', color: authorColor, textTransform: 'uppercase' }}>
                    {m.author}
                  </div>
                )}
                <div style={{ fontSize: '1rem', lineHeight: '1.4' }}>{m.text}</div>
              </div>
              <span style={{ fontSize: '0.7rem', color: isDark ? '#555' : '#999', marginTop: '5px', fontWeight: '500' }}>{m.timestamp}</span>
            </div>
          );
        })
      )}
    </div>
  );
}

export function MessageInput({ author }) {
  const [text, setText] = useState('');
  const { sendMessage } = useChat();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(author, text);
      setText('');
    }
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '12px',
    background: isDark ? '#111' : '#fff',
    padding: '8px',
    borderRadius: '30px',
    border: isDark ? '1px solid #333' : '1px solid #eee',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 20px',
    background: 'transparent',
    border: 'none',
    color: isDark ? 'white' : '#333',
    outline: 'none',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '10px 25px',
    background: author === 'Иван' ? '#017ae0' : '#00bc89',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  };

  return (
    <div style={inputGroupStyle}>
      <input 
        style={inputStyle}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={lang === 'bg' ? `Пиши като ${author}...` : `Type as ${author}...`}
      />
      <button 
        style={buttonStyle} 
        onMouseOver={(e) => e.target.style.filter = 'brightness(1.1)'}
        onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
        onClick={handleSend}
      >
        {lang === 'bg' ? 'Изпрати' : 'Send'}
      </button>
    </div>
  );
}

export function ChatStats() {
  const { messages } = useChat();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;
  
  const ivanCount = messages.filter(m => m.author === "Иван").length;
  const mariaCount = messages.filter(m => m.author === "Мария").length;
  
  const statsStyle = {
    marginTop: '2.5rem',
    padding: '15px',
    background: isDark ? '#111' : '#fff',
    borderRadius: '12px',
    fontSize: '0.9rem',
    display: 'flex',
    justifyContent: 'space-around',
    color: isDark ? '#888' : '#666',
    border: isDark ? '1px solid #222' : '1px solid #eee',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
  };

  const statItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  };

  return (
    <div style={statsStyle}>
      <div style={statItemStyle}>
        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{lang === 'bg' ? 'ОБЩО' : 'TOTAL'}</span>
        <strong style={{ color: isDark ? '#eee' : '#333', fontSize: '1.2rem' }}>{messages.length}</strong>
      </div>
      <div style={{ ...statItemStyle, borderLeft: isDark ? '1px solid #222' : '1px solid #eee', borderRight: isDark ? '1px solid #222' : '1px solid #eee', padding: '0 2rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{lang === 'bg' ? 'ИВАН' : 'IVAN'}</span>
        <strong style={{ color: '#017ae0', fontSize: '1.2rem' }}>{ivanCount}</strong>
      </div>
      <div style={statItemStyle}>
        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{lang === 'bg' ? 'МАРИЯ' : 'MARIA'}</span>
        <strong style={{ color: '#00bc89', fontSize: '1.2rem' }}>{mariaCount}</strong>
      </div>
    </div>
  );
}

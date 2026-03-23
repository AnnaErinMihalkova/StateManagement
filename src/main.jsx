import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import VotingApp from './task1-voting/VotingApp'
import Task2App from './task2-settings/Task2App'
import Task3App from './task3-chat/Task3App'
import Task4App from './task4-grades/Task4App'
import { SettingsProvider, useSettings } from './task2-settings/SettingsContext'
import './index.css'

function AppContent() {
  const [activeTask, setActiveTask] = useState(4);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  
  const sizeMap = { small: "14px", medium: "16px", large: "18px" };
  const globalFontSize = sizeMap[settings.fontSize];

  const appContainerStyle = {
    minHeight: '100vh',
    backgroundColor: isDark ? '#000000' : '#f0f2f5',
    color: isDark ? '#ffffff' : '#1a1a1a',
    fontSize: globalFontSize,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '2.5rem',
    padding: '12px',
    background: isDark ? '#111' : '#fff',
    borderRadius: '12px',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.05)',
    border: isDark ? '1px solid #333' : '1px solid #eee',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = (taskId) => ({
    padding: '10px 20px',
    background: activeTask === taskId ? '#017ae0' : 'transparent',
    color: activeTask === taskId ? 'white' : (isDark ? '#999' : '#666'),
    border: activeTask === taskId ? '1px solid #017ae0' : (isDark ? '1px solid #333' : '1px solid #ddd'),
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9em',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={appContainerStyle}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <nav style={navStyle}>
          <button style={buttonStyle(1)} onClick={() => setActiveTask(1)}>
            1: {settings.language === 'bg' ? 'Гласуване' : 'Voting'}
          </button>
          <button style={buttonStyle(2)} onClick={() => setActiveTask(2)}>
            2: {settings.language === 'bg' ? 'Настройки' : 'Settings'}
          </button>
          <button style={buttonStyle(3)} onClick={() => setActiveTask(3)}>
            3: {settings.language === 'bg' ? 'Чат стая' : 'Chat Room'}
          </button>
          <button style={buttonStyle(4)} onClick={() => setActiveTask(4)}>
            4: {settings.language === 'bg' ? 'Оценки' : 'Grades'}
          </button>
        </nav>

        <main style={{ minHeight: '600px' }}>
          {activeTask === 1 && <VotingApp />}
          {activeTask === 2 && <Task2App />}
          {activeTask === 3 && <Task3App />}
          {activeTask === 4 && <Task4App />}
        </main>
        
        <footer style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', color: isDark ? '#555' : '#999', borderTop: isDark ? '1px solid #222' : '1px solid #eee' }}>
          <p>&copy; 2026 React State Management Tasks</p>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

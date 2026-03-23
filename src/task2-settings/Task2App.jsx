import React from 'react';
import { useSettings } from './SettingsContext';
import { SettingsPanel, TextPreview, ThemePreview, GreetingPreview } from './SettingsComponents';

function Task2App() {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
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
        {settings.language === 'bg' ? 'Настройки на приложение' : 'App Settings'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <SettingsPanel />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <TextPreview />
          <ThemePreview />
        </div>
        <GreetingPreview />
      </div>
    </div>
  );
}

export default Task2App;

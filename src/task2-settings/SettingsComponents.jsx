import React from 'react';
import { useSettings } from './SettingsContext';

const getPanelStyle = (isDark) => ({
  background: isDark ? '#111' : '#fff',
  padding: '1.5rem',
  borderRadius: '16px',
  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
  marginBottom: '1.5rem',
  color: isDark ? '#eee' : '#333',
  border: isDark ? '1px solid #333' : '1px solid #eee',
  transition: 'all 0.3s ease'
});

const getControlStyle = () => ({
  marginBottom: '1.2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const getSelectStyle = (isDark) => ({
  padding: '8px 12px',
  borderRadius: '8px',
  border: isDark ? '1px solid #333' : '1px solid #ddd',
  background: isDark ? '#222' : '#fcfcfc',
  color: isDark ? '#eee' : '#333',
  fontSize: '1rem',
  outline: 'none',
  cursor: 'pointer'
});

const getActionButtonStyle = (active, activeColor, isDark) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  border: isDark ? '1px solid #333' : '1px solid #ddd',
  background: active ? activeColor : (isDark ? '#222' : '#f0f0f0'),
  color: active ? 'white' : (isDark ? '#999' : '#666'),
  fontSize: '0.95rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
});

export function SettingsPanel() {
  const { settings, updateSetting } = useSettings();
  const isDark = settings.theme === 'dark';

  return (
    <div style={getPanelStyle(isDark)}>
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#017ae0', fontSize: '1.5rem' }}>
        {settings.language === 'bg' ? 'Контролен панел' : 'Control Panel'}
      </h3>
      
      <div style={getControlStyle()}>
        <label style={{ fontWeight: '500' }}>
          {settings.language === 'bg' ? 'Размер на текста:' : 'Font Size:'}
        </label>
        <select 
          style={getSelectStyle(isDark)}
          value={settings.fontSize} 
          onChange={(e) => updateSetting("fontSize", e.target.value)}
        >
          <option value="small">{settings.language === 'bg' ? 'Малък' : 'Small'}</option>
          <option value="medium">{settings.language === 'bg' ? 'Среден' : 'Medium'}</option>
          <option value="large">{settings.language === 'bg' ? 'Голям' : 'Large'}</option>
        </select>
      </div>

      <div style={getControlStyle()}>
        <label style={{ fontWeight: '500' }}>
          {settings.language === 'bg' ? 'Тема:' : 'Theme:'}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            style={getActionButtonStyle(settings.theme === 'light', '#017ae0', isDark)}
            onClick={() => updateSetting("theme", "light")}
          >
            {settings.language === 'bg' ? 'Светла' : 'Light'}
          </button>
          <button 
            style={getActionButtonStyle(settings.theme === 'dark', '#017ae0', isDark)}
            onClick={() => updateSetting("theme", "dark")}
          >
            {settings.language === 'bg' ? 'Тъмна' : 'Dark'}
          </button>
        </div>
      </div>

      <div style={getControlStyle()}>
        <label style={{ fontWeight: '500' }}>
          {settings.language === 'bg' ? 'Език:' : 'Language:'}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            style={getActionButtonStyle(settings.language === 'bg', '#27ae60', isDark)}
            onClick={() => updateSetting("language", "bg")}
          >
            BG
          </button>
          <button 
            style={getActionButtonStyle(settings.language === 'en', '#27ae60', isDark)}
            onClick={() => updateSetting("language", "en")}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

export function TextPreview() {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const sizeMap = { small: "14px", medium: "16px", large: "20px" };
  
  return (
    <div style={{ 
      background: isDark ? '#111' : '#fff', 
      padding: '1.5rem', 
      borderRadius: '16px', 
      marginBottom: '1.5rem',
      border: isDark ? '1px solid #333' : '1px solid #eee',
      boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <h4 style={{ marginTop: 0, marginBottom: '1.2rem', color: isDark ? '#888' : '#999', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {settings.language === 'bg' ? 'Преглед на текста' : 'Text Preview'}
      </h4>
      <p style={{ fontSize: sizeMap[settings.fontSize], margin: 0, color: isDark ? '#eee' : '#333', lineHeight: '1.6' }}>
        {settings.language === 'bg' 
          ? "Всички компоненти в това приложение четат настройките от един общ Context. Когато промените нещо в панела, тук веднага виждате ефекта върху размера на шрифта и езика." 
          : "All components in this application read settings from a common Context. When you change something in the panel, you immediately see the effect on font size and language here."}
      </p>
    </div>
  );
}

export function ThemePreview() {
  const { settings } = useSettings();
  const isDark = settings.theme === "dark";
  
  return (
    <div style={{ 
      background: isDark ? "#1a1a2e" : "#ffffff",
      color: isDark ? "#ffffff" : "#000000",
      padding: '2.5rem',
      borderRadius: '16px',
      marginBottom: '1.5rem',
      border: isDark ? '1px solid #333' : '1px solid #ddd',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <h4 style={{ marginTop: 0, marginBottom: '1rem', opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase' }}>
        {settings.language === 'bg' ? 'Преглед на темата' : 'Theme Preview'}
      </h4>
      <strong style={{ fontSize: '1.4rem', fontWeight: '800' }}>
        {isDark 
          ? (settings.language === 'bg' ? "ТЪМНА ТЕМА" : "DARK MODE") 
          : (settings.language === 'bg' ? "СВЕТЛА ТЕМА" : "LIGHT MODE")}
      </strong>
    </div>
  );
}

export function GreetingPreview() {
  const { settings } = useSettings();
  
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #017ae0 0%, #005fa8 100%)',
      padding: '2.5rem',
      borderRadius: '16px',
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: '900',
      color: 'white',
      boxShadow: '0 12px 32px rgba(1, 122, 224, 0.4)',
      textShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      {settings.language === "bg" ? "Здравейте!" : "Hello!"}
    </div>
  );
}

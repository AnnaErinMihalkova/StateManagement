import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("app_settings");
    return saved ? JSON.parse(saved) : {
      fontSize: "medium",
      theme: "dark",
      language: "bg",
    };
  });

  useEffect(() => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings трябва да е в SettingsProvider!");
  return ctx;
}

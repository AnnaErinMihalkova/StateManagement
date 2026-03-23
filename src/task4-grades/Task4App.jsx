import React from 'react';
import { AddStudentForm, GradeForm, FilterBar, StudentTable, ClassStats } from './GradeComponents';
import { useSettings } from '../task2-settings/SettingsContext';

function Task4App() {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2.5rem',
    background: isDark ? '#000' : '#f4f7f6',
    borderRadius: '24px',
    color: isDark ? '#eee' : '#333',
    minHeight: '100vh',
    border: isDark ? '1px solid #222' : '1px solid #ddd',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const headerStyle = {
    textAlign: 'center',
    color: isDark ? '#fff' : '#2c3e50',
    marginBottom: '3rem',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    letterSpacing: '-1px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        {lang === 'bg' ? 'Табло за ученически оценки' : 'Student Grade Dashboard'}
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '2.5rem' }}>
        <AddStudentForm />
        <GradeForm />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <FilterBar />
        <StudentTable />
        <ClassStats />
      </div>
    </div>
  );
}

export default Task4App;

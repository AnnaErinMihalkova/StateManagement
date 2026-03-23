import React, { useState, useMemo } from 'react';
import { 
  useGradeStore, 
  SUBJECTS, 
  selectStudents,
  selectAddStudent,
  selectAddGrade,
  selectSelectedSubject,
  selectSortBy,
  selectSetSubjectFilter,
  selectSetSortBy
} from './GradeStore';
import { useSettings } from '../task2-settings/SettingsContext';

const getCardStyle = (isDark) => ({
  background: isDark ? '#111' : '#fff',
  padding: '1.5rem',
  borderRadius: '16px',
  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
  marginBottom: '1.5rem',
  border: isDark ? '1px solid #333' : '1px solid #eee',
  transition: 'all 0.3s ease'
});

const getInputStyle = (isDark) => ({
  padding: '10px 14px',
  borderRadius: '8px',
  border: isDark ? '1px solid #333' : '1px solid #ddd',
  background: isDark ? '#222' : '#fcfcfc',
  color: isDark ? 'white' : '#333',
  marginRight: '12px',
  fontSize: '0.95rem',
  outline: 'none'
});

const buttonStyle = {
  padding: '10px 20px',
  background: '#017ae0',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

export function AddStudentForm() {
  const [name, setName] = useState('');
  const addStudent = useGradeStore(selectAddStudent);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addStudent(name);
      setName('');
    }
  };

  return (
    <form style={getCardStyle(isDark)} onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0, marginBottom: '1.2rem', color: '#017ae0' }}>
        {lang === 'bg' ? 'Добави нов ученик' : 'Add New Student'}
      </h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          style={{ ...getInputStyle(isDark), flex: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === 'bg' ? "Име на ученика..." : "Student name..."}
        />
        <button style={buttonStyle} type="submit">{lang === 'bg' ? 'Добави' : 'Add'}</button>
      </div>
    </form>
  );
}

export function GradeForm() {
  const students = useGradeStore(selectStudents);
  const addGrade = useGradeStore(selectAddGrade);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;
  
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [grade, setGrade] = useState(6);

  const handleAddGrade = () => {
    if (studentId) {
      addGrade(Number(studentId), subject, Number(grade));
    }
  };

  return (
    <div style={getCardStyle(isDark)}>
      <h3 style={{ marginTop: 0, marginBottom: '1.2rem', color: '#017ae0' }}>
        {lang === 'bg' ? 'Добави оценка' : 'Add Grade'}
      </h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <select 
          style={getInputStyle(isDark)} 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">{lang === 'bg' ? 'Избери ученик' : 'Select student'}</option>
          {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        
        <select 
          style={getInputStyle(isDark)} 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
        >
          {SUBJECTS.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
        
        <input 
          style={{ ...getInputStyle(isDark), width: '70px' }} 
          type="number" 
          min="2" max="6" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)}
        />
        
        <button style={{ ...buttonStyle, background: '#27ae60' }} onClick={handleAddGrade}>
          {lang === 'bg' ? 'Добави' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export function FilterBar() {
  const selectedSubject = useGradeStore(selectSelectedSubject);
  const sortBy = useGradeStore(selectSortBy);
  const setSubjectFilter = useGradeStore(selectSetSubjectFilter);
  const setSortBy = useGradeStore(selectSetSortBy);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  return (
    <div style={{ ...getCardStyle(isDark), display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: 'bold', color: isDark ? '#888' : '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          {lang === 'bg' ? 'Предмет:' : 'Subject:'}
        </label>
        <select style={getInputStyle(isDark)} value={selectedSubject} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="all">{lang === 'bg' ? 'Всички предмети' : 'All subjects'}</option>
          {SUBJECTS.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: 'bold', color: isDark ? '#888' : '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          {lang === 'bg' ? 'Сортирай:' : 'Sort:'}
        </label>
        <select style={getInputStyle(isDark)} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">{lang === 'bg' ? 'По име' : 'By name'}</option>
          <option value="average">{lang === 'bg' ? 'По успех' : 'By grade'}</option>
        </select>
      </div>
    </div>
  );
}

export function StudentTable() {
  const students = useGradeStore(selectStudents);
  const selectedSubject = useGradeStore(selectSelectedSubject);
  const sortBy = useGradeStore(selectSortBy);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const filteredStudents = useMemo(() => {
    if (!students) return [];

    const withAverages = students.map(st => {
      const gradesObj = st.grades || {};
      const allGrades = selectedSubject === "all"
        ? Object.values(gradesObj).flat()
        : gradesObj[selectedSubject] || [];
      
      const average = allGrades.length > 0
        ? allGrades.reduce((a, b) => a + b, 0) / allGrades.length
        : 0;
      return { ...st, average: Math.round(average * 100) / 100 };
    });

    return [...withAverages].sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name, "bg")
        : b.average - a.average
    );
  }, [students, selectedSubject, sortBy]);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    background: isDark ? '#111' : '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
    border: isDark ? '1px solid #333' : '1px solid #eee'
  };

  const thStyle = {
    background: isDark ? '#1a1a1a' : '#f8f9fa',
    padding: '16px',
    textAlign: 'left',
    borderBottom: isDark ? '2px solid #333' : '2px solid #eee',
    fontWeight: 'bold',
    color: isDark ? '#888' : '#666',
    textTransform: 'uppercase',
    fontSize: '0.85rem'
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: isDark ? '1px solid #222' : '1px solid #eee',
    color: isDark ? '#eee' : '#333'
  };

  const getGradeColor = (avg) => {
    if (avg >= 5) return '#27ae60';
    if (avg < 3 && avg > 0) return '#e74c3c';
    return isDark ? '#eee' : '#333';
  };

  return (
    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{lang === 'bg' ? 'Ученик' : 'Student'}</th>
            {SUBJECTS.map(sub => <th key={sub} style={thStyle}>{sub}</th>)}
            <th style={thStyle}>{lang === 'bg' ? 'Среден успех' : 'Average Grade'}</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(st => (
            <tr key={st.id} style={{ transition: 'background 0.2s' }}>
              <td style={{ ...tdStyle, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>{st.name}</td>
              {SUBJECTS.map(sub => (
                <td key={sub} style={tdStyle}>
                  {st.grades[sub]?.map((g, i) => (
                    <span key={i} style={{ 
                      display: 'inline-block',
                      background: isDark ? '#222' : '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      margin: '2px',
                      color: g >= 5 ? '#27ae60' : (g < 3 ? '#e74c3c' : (isDark ? '#eee' : '#333')),
                      border: isDark ? '1px solid #333' : '1px solid #ddd'
                    }}>{g}</span>
                  )) || <span style={{ color: isDark ? '#444' : '#ccc' }}>-</span>}
                </td>
              ))}
              <td style={{ ...tdStyle, fontWeight: 'bold' }}>
                <span style={{ 
                  background: getGradeColor(st.average) + '22',
                  color: getGradeColor(st.average),
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: `1px solid ${getGradeColor(st.average)}44`
                }}>
                  {st.average > 0 ? st.average.toFixed(2) : (lang === 'bg' ? "Няма" : "N/A")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ClassStats() {
  const students = useGradeStore(selectStudents);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const stats = useMemo(() => {
    if (!students || students.length === 0) return { average: 0, count: 0, min: 0, max: 0 };

    const allGrades = students.flatMap(st =>
      Object.values(st.grades || {}).flat()
    );
    
    if (allGrades.length === 0) return { average: 0, count: students.length, min: 0, max: 0 };
    
    const average = Math.round((allGrades.reduce((a, b) => a + b, 0) / allGrades.length) * 100) / 100;
    const min = Math.min(...allGrades);
    const max = Math.max(...allGrades);
    
    return { average, count: students.length, min, max };
  }, [students]);

  const { average, count, min, max } = stats;

  const statBoxStyle = (color) => ({
    background: isDark ? '#111' : '#fff',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
    borderTop: `4px solid ${color}`,
    borderLeft: isDark ? '1px solid #222' : '1px solid #eee',
    borderRight: isDark ? '1px solid #222' : '1px solid #eee',
    borderBottom: isDark ? '1px solid #222' : '1px solid #eee',
    transition: 'all 0.3s ease'
  });

  const texts = {
    bg: {
      students: "Ученици",
      average: "Общ успех",
      max: "Макс. оценка",
      min: "Мин. оценка"
    },
    en: {
      students: "Students",
      average: "Total Average",
      max: "Max Grade",
      min: "Min Grade"
    }
  };

  const t = texts[lang];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
      <div style={statBoxStyle('#017ae0')}>
        <div style={{ fontSize: '0.75rem', color: isDark ? '#666' : '#999', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.students}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>{count}</div>
      </div>
      <div style={statBoxStyle('#27ae60')}>
        <div style={{ fontSize: '0.75rem', color: isDark ? '#666' : '#999', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.average}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>{average.toFixed(2)}</div>
      </div>
      <div style={statBoxStyle('#f39c12')}>
        <div style={{ fontSize: '0.75rem', color: isDark ? '#666' : '#999', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.max}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>{max > 0 ? max : "-"}</div>
      </div>
      <div style={statBoxStyle('#e74c3c')}>
        <div style={{ fontSize: '0.75rem', color: isDark ? '#666' : '#999', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{t.min}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>{min < 7 && min > 0 ? min : "-"}</div>
      </div>
    </div>
  );
}

import React, { useReducer } from 'react';
import { useSettings } from '../task2-settings/SettingsContext';

function voteReducer(state, action) {
  switch (action.type) {
    case 'VOTE':
      return {
        votes: {
          ...state.votes,
          [action.language]: state.votes[action.language] + 1,
        },
      };
    case 'RESET':
      return {
        votes: Object.fromEntries(
          Object.keys(state.votes).map(k => [k, 0])
        ),
      };
    default:
      return state;
  }
}

function VotingApp() {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const lang = settings.language;

  const [state, dispatch] = useReducer(voteReducer, {
    votes: { JavaScript: 0, Python: 0, "C++": 0, Rust: 0 },
  });

  const totalVotes = Object.values(state.votes).reduce((a, b) => a + b, 0);
  const maxVotes = Math.max(...Object.values(state.votes));
  const leaders = Object.entries(state.votes)
    .filter(([_, count]) => count === maxVotes && maxVotes > 0)
    .map(([lang]) => lang);

  const containerStyle = {
    background: isDark ? '#111' : '#ffffff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
    color: isDark ? '#eee' : '#333',
    border: isDark ? '1px solid #333' : '1px solid #eee',
    transition: 'all 0.3s ease'
  };

  const itemStyle = {
    marginBottom: '2rem',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8rem',
    fontSize: '1.2rem'
  };

  const progressContainerStyle = {
    background: isDark ? '#222' : '#f0f0f0',
    height: '14px',
    borderRadius: '7px',
    overflow: 'hidden',
    marginBottom: '1rem',
    border: isDark ? '1px solid #333' : '1px solid #eee'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#017ae0',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    background: 'transparent',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    marginTop: '2rem',
    width: '100%'
  };

  const texts = {
    bg: {
      title: "Гласуване за любим език",
      total: "Общо гласове",
      vote: "Гласувай за",
      reset: "Нулирай всички гласове",
      votesLabel: "гласа"
    },
    en: {
      title: "Vote for Favorite Language",
      total: "Total Votes",
      vote: "Vote for",
      reset: "Reset all votes",
      votesLabel: "votes"
    }
  };

  const t = texts[lang];

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: isDark ? '#fff' : '#2c3e50', fontSize: '2rem' }}>
        {t.title}
      </h2>
      
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem', color: '#017ae0' }}>
        {t.total}: {totalVotes}
      </div>

      {Object.entries(state.votes).map(([language, count]) => {
        const isLeader = leaders.includes(language);
        const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        
        return (
          <div key={language} style={itemStyle}>
            <div style={labelStyle}>
              <span style={{ 
                fontWeight: isLeader ? "bold" : "normal",
                color: isLeader ? "#27ae60" : (isDark ? "#eee" : "#333")
              }}>
                {language} {isLeader && "🏆"}
              </span>
              <span style={{ color: isDark ? '#888' : '#666' }}>
                {count} {t.votesLabel} ({percentage}%)
              </span>
            </div>

            <div style={progressContainerStyle}>
              <div style={{ 
                width: `${percentage}%`, 
                background: isLeader ? "#27ae60" : "#017ae0",
                height: "100%",
                borderRadius: '7px',
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>

            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.background = '#015fa8'}
              onMouseOut={(e) => e.target.style.background = '#017ae0'}
              onClick={() => dispatch({ type: 'VOTE', language })}
            >
              {t.vote} {language}
            </button>
          </div>
        );
      })}

      <button 
        style={resetButtonStyle}
        onMouseOver={(e) => {
          e.target.style.background = '#e74c3c';
          e.target.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#e74c3c';
        }}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        {t.reset}
      </button>
    </div>
  );
}

export default VotingApp;

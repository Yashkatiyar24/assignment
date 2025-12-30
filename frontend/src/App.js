import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '30px',
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    opacity: 0.9,
  },
  articleList: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    marginBottom: '24px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  },
  cardHeader: {
    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
    padding: '20px 24px',
    color: 'white',
  },
  cardTitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
    fontWeight: '600',
    margin: 0,
    lineHeight: 1.4,
  },
  cardMeta: {
    fontSize: '0.85rem',
    opacity: 0.9,
    marginTop: '8px',
  },
  cardBody: {
    padding: '24px',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  column: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e9ecef',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  originalBadge: {
    background: '#e3f2fd',
    color: '#1565c0',
  },
  rewrittenBadge: {
    background: '#e8f5e9',
    color: '#2e7d32',
  },
  content: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#424242',
    maxHeight: '400px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    padding: '12px',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  },
  citations: {
    marginTop: '20px',
    padding: '16px',
    background: '#fff3e0',
    borderRadius: '8px',
    borderLeft: '4px solid #ff9800',
  },
  citationsTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#e65100',
    marginBottom: '12px',
  },
  citationLink: {
    display: 'block',
    color: '#1565c0',
    fontSize: '0.85rem',
    marginBottom: '8px',
    wordBreak: 'break-all',
    textDecoration: 'none',
  },
  loading: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
    padding: '60px 20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  error: {
    textAlign: 'center',
    color: '#ffcdd2',
    background: 'rgba(244,67,54,0.2)',
    padding: '20px',
    borderRadius: '12px',
    maxWidth: '600px',
    margin: '40px auto',
  },
  empty: {
    textAlign: 'center',
    color: 'white',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  link: {
    color: '#4facfe',
    textDecoration: 'none',
  },
  viewOriginalBtn: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'background 0.2s',
  },
};

// Add CSS animation for spinner
const spinnerCSS = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inject spinner animation
    const style = document.createElement('style');
    style.textContent = spinnerCSS;
    document.head.appendChild(style);

    // Fetch articles
    axios.get(`${API_BASE}/articles`)
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch articles:', err);
        setError(err.message || 'Failed to load articles');
        setLoading(false);
      });

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 BeyondChats Article Viewer</h1>
        </div>
        <div style={styles.error}>
          <h3>⚠️ Error Loading Articles</h3>
          <p>{error}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            Make sure the backend server is running at {API_BASE}
          </p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 BeyondChats Article Viewer</h1>
        </div>
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📭</div>
          <h2>No Articles Yet</h2>
          <p>Run the scraper script to fetch articles from BeyondChats blog.</p>
          <code style={{ 
            display: 'block', 
            background: 'rgba(0,0,0,0.2)', 
            padding: '12px', 
            borderRadius: '8px',
            marginTop: '16px' 
          }}>
            cd script && node scrape.js
          </code>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 BeyondChats Article Viewer</h1>
        <p style={styles.subtitle}>
          Compare original articles with AI-rewritten versions
        </p>
      </header>

      <div style={styles.articleList}>
        {articles.map((article, index) => (
          <article key={article._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{article.title}</h2>
              <div style={styles.cardMeta}>
                Article {index + 1} of {articles.length}
                {article.url && (
                  <>
                    {' • '}
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'white', opacity: 0.9 }}
                    >
                      View Original →
                    </a>
                  </>
                )}
              </div>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.columns}>
                {/* Original Content */}
                <div style={styles.column}>
                  <div style={styles.columnHeader}>
                    <span style={{...styles.badge, ...styles.originalBadge}}>
                      📄 Original
                    </span>
                  </div>
                  <div style={styles.content}>
                    {article.originalContent || 'No original content available'}
                  </div>
                </div>

                {/* Rewritten Content */}
                <div style={styles.column}>
                  <div style={styles.columnHeader}>
                    <span style={{...styles.badge, ...styles.rewrittenBadge}}>
                      ✨ AI Rewritten
                    </span>
                  </div>
                  <div style={styles.content}>
                    {article.rewrittenContent || 'Not yet rewritten. Run rewriteArticles.js to generate.'}
                  </div>
                </div>
              </div>

              {/* Citations */}
              {article.citations && article.citations.length > 0 && article.citations[0] !== 'No external references used' && (
                <div style={styles.citations}>
                  <div style={styles.citationsTitle}>📎 References Used</div>
                  {article.citations.map((citation, idx) => (
                    <a 
                      key={idx}
                      href={citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.citationLink}
                    >
                      {idx + 1}. {citation}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <footer style={{ textAlign: 'center', color: 'white', opacity: 0.7, padding: '40px 20px', fontSize: '0.9rem' }}>
        Built for BeyondChats Full Stack Web Developer Internship Assignment
      </footer>
    </div>
  );
}

export default App;

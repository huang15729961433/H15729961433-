import { useState } from 'react';
import styles from './QAnything.module.css';

export default function QAnything() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('请输入问题');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/qanything', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="输入您的问题"
          className={styles.input}
        />
        <button 
          type="submit" 
          disabled={loading}
          className={styles.button}
        >
          {loading ? '查询中...' : '提问'}
        </button>
      </form>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {answer && (
        <div className={styles.answer}>
          <h3>答案:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
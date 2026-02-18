import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamic API URL based on environment
  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setApiResponse(null);
    setIsLoading(true);

    try {
      // Parse the input as JSON
      const jsonInput = JSON.parse(inputText);
      setSubmittedText(inputText);

      // Call your proxy server with dynamic URL
      const response = await fetch(`${API_URL}/api/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInput)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);

    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Azure ML API Tester</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jsonInput">Enter JSON Input:</label>
            <textarea
              id="jsonInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='{"key": "value", "data": "your data here"}'
              rows={10}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Sending...' : 'Submit to API'}
          </button>
        </form>

        {error && (
          <div className="error-box">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {submittedText && !error && (
          <div className="result-box">
            <h3>📤 Submitted JSON:</h3>
            <pre>{submittedText}</pre>
          </div>
        )}

        {apiResponse && (
          <div className="result-box success">
            <h3>✅ API Response:</h3>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
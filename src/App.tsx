import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [submittedText, setSubmittedText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedText(inputText)
  }

  return (
    <div className="app-container">
      <h1>Simple React App</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="textInput">Enter your text:</label>
          <textarea
            id="textInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            rows={6}
            className="text-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {submittedText && (
        <div className="result-container">
          <h2>Submitted Text:</h2>
          <p className="submitted-text">{submittedText}</p>
        </div>
      )}
    </div>
  )
}

export default App

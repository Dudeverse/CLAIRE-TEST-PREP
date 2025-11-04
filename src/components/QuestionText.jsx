import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

function QuestionText({ text, isDarkMode }) {
  // Parse text to find code blocks marked with ```python ... ```
  const parts = text.split(/(```python[\s\S]*?```)/g)
  
  return (
    <div className="question-text">
      {parts.map((part, index) => {
        if (part.startsWith('```python')) {
          // Extract code from ```python ... ```
          const code = part.replace(/```python\n?/, '').replace(/```$/, '').trim()
          return (
            <SyntaxHighlighter
              key={index}
              language="python"
              style={isDarkMode ? tomorrow : prism}
              customStyle={{
                borderRadius: '6px',
                padding: '15px',
                margin: '10px 0',
                fontSize: '0.95em'
              }}
            >
              {code}
            </SyntaxHighlighter>
          )
        } else if (part.trim()) {
          return <p key={index}>{part}</p>
        }
        return null
      })}
    </div>
  )
}

export default QuestionText


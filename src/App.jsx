import { useState, useEffect } from 'react'
import MainPage from './components/MainPage'
import ExamArea from './components/ExamArea'

function App() {
  const [mode, setMode] = useState(null) // null, 'exam', or 'practice'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load dark mode preference from localStorage
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Save dark mode preference and apply class to body
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const handleStartExam = () => {
    setMode('exam')
  }

  const handleStartPractice = () => {
    setMode('practice')
  }

  const handleExit = () => {
    setMode(null)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="app">
      {mode === null ? (
        <MainPage 
          onStartExam={handleStartExam} 
          onStartPractice={handleStartPractice}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <ExamArea 
          mode={mode} 
          onExit={handleExit}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  )
}

export default App


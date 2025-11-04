import { useState } from 'react'
import MainPage from './components/MainPage'
import ExamArea from './components/ExamArea'

function App() {
  const [mode, setMode] = useState(null) // null, 'exam', or 'practice'

  const handleStartExam = () => {
    setMode('exam')
  }

  const handleStartPractice = () => {
    setMode('practice')
  }

  const handleExit = () => {
    setMode(null)
  }

  return (
    <div className="app">
      {mode === null ? (
        <MainPage 
          onStartExam={handleStartExam} 
          onStartPractice={handleStartPractice} 
        />
      ) : (
        <ExamArea 
          mode={mode} 
          onExit={handleExit} 
        />
      )}
    </div>
  )
}

export default App


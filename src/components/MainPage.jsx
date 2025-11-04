function MainPage({ onStartExam, onStartPractice, isDarkMode, toggleDarkMode }) {
  return (
    <div className="main-page">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <h1>Claire's Python Test Prep</h1>
      <p className="welcome-message">Welcome, Claire! Ready to practice?</p>
      <div className="button-container">
        <button className="mode-button exam-button" onClick={onStartExam}>
          Exam Mode
        </button>
        <button className="mode-button practice-button" onClick={onStartPractice}>
          Practice Mode
        </button>
      </div>
    </div>
  )
}

export default MainPage


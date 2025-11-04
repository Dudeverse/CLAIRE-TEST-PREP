function MainPage({ onStartExam, onStartPractice }) {
  return (
    <div className="main-page">
      <h1>Python Test Prep</h1>
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


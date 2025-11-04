import { useState, useEffect } from 'react'
import { questions } from '../questionsData'
import MCQQuestion from './MCQQuestion'
import OpenEndedQuestion from './OpenEndedQuestion'

function ExamArea({ mode, onExit, isDarkMode, toggleDarkMode }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [bookmarked, setBookmarked] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [gradeResults, setGradeResults] = useState(null)

  // Timer effect - only for exam mode
  useEffect(() => {
    if (mode !== 'exam' || isSubmitted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit(true) // Auto-submit
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mode, isSubmitted])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const toggleBookmark = (questionIndex) => {
    setBookmarked((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex)
      } else {
        newSet.add(questionIndex)
      }
      return newSet
    })
  }

  const handleSubmit = (autoSubmit = false) => {
    // Grade MCQs
    const mcqQuestions = questions.filter(q => q.type === 'mcq')
    const gradedMCQs = mcqQuestions.map(q => {
      const userAnswer = answers[q.id]
      const isCorrect = userAnswer === q.correctAnswer
      return {
        questionId: q.id,
        isCorrect,
        userAnswer,
        correctAnswer: q.correctAnswer
      }
    })

    const score = gradedMCQs.filter(r => r.isCorrect).length
    const total = mcqQuestions.length

    setGradeResults({
      score,
      total,
      percentage: (score / total) * 100,
      gradedMCQs
    })

    setIsSubmitted(true)
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined

  if (isSubmitted && gradeResults) {
    return (
      <div className="submitted-page">
        <div className="submitted-content">
          <h1>Exam Submitted!</h1>
          <div className="score-display">
            <h2>MCQ Score</h2>
            <div className="score-circle">
              <div className="score-number">{gradeResults.score}/{gradeResults.total}</div>
              <div className="score-percentage">{gradeResults.percentage.toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="results-breakdown">
            <h3>MCQ Results</h3>
            <div className="results-grid">
              {gradeResults.gradedMCQs.map((result) => (
                <div key={result.questionId} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  <span className="result-question">Q{result.questionId}</span>
                  <span className="result-icon">{result.isCorrect ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="note">Open-ended questions are not auto-graded.</p>
          <button className="exit-button" onClick={onExit}>
            Return to Main Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="exam-area">
      {/* Header */}
      <div className="exam-header">
        <div className="header-left">
          <h2>{mode === 'exam' ? 'Exam Mode' : 'Practice Mode'}</h2>
        </div>
        {mode === 'exam' && (
          <div className="timer">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}
        <div className="header-right">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="submit-button" onClick={() => handleSubmit(false)}>
            Submit Exam
          </button>
        </div>
      </div>

      <div className="exam-body">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Questions</h3>
          <div className="question-numbers">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`question-number ${currentQuestion === index ? 'active' : ''} ${answers[q.id] !== undefined ? 'answered' : ''} ${bookmarked.has(index) ? 'bookmarked' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {q.id}
                {bookmarked.has(index) && <span className="bookmark-indicator">★</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div className="question-area">
          {currentQ.type === 'mcq' ? (
            <MCQQuestion
              question={currentQ}
              selectedAnswer={answers[currentQ.id]}
              onSelectAnswer={(answer) => handleAnswerChange(currentQ.id, answer)}
              isDarkMode={isDarkMode}
            />
          ) : (
            <OpenEndedQuestion
              question={currentQ}
              answer={answers[currentQ.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Navigation */}
          <div className="question-navigation">
            <div className="nav-left">
              <button
                className="bookmark-button"
                onClick={() => toggleBookmark(currentQuestion)}
              >
                {bookmarked.has(currentQuestion) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
            <div className="nav-right">
              <button
                className="nav-button"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="nav-button"
                onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQuestion === questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamArea


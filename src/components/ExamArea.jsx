import { useState, useEffect } from 'react'
import { questions } from '../questionsData'
import MCQQuestion from './MCQQuestion'
import OpenEndedQuestion from './OpenEndedQuestion'

function ExamArea({ mode, onExit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [bookmarked, setBookmarked] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    const submission = {
      mode,
      submittedAt: new Date().toISOString(),
      autoSubmit,
      timeSpent: mode === 'exam' ? (60 * 60 - timeLeft) : null,
      answers: questions.map((q) => ({
        questionId: q.id,
        type: q.type,
        answer: answers[q.id] || null,
        bookmarked: bookmarked.has(questions.indexOf(q))
      }))
    }

    // Download JSON
    const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `exam-submission-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsSubmitted(true)
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined

  if (isSubmitted) {
    return (
      <div className="submitted-page">
        <div className="submitted-content">
          <h1>Exam Submitted!</h1>
          <p>Your answers have been saved and downloaded as a JSON file.</p>
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
        <h2>{mode === 'exam' ? 'Exam Mode' : 'Practice Mode'}</h2>
        {mode === 'exam' && (
          <div className="timer">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}
        <button className="submit-button" onClick={() => handleSubmit(false)}>
          Submit Exam
        </button>
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
            />
          ) : (
            <OpenEndedQuestion
              question={currentQ}
              answer={answers[currentQ.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
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


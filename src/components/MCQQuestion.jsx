function MCQQuestion({ question, selectedAnswer, onSelectAnswer }) {
  return (
    <div className="question-content">
      <h2>Question {question.id}</h2>
      <p className="question-text">{question.question}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(index)}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={selectedAnswer === index}
              onChange={() => onSelectAnswer(index)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MCQQuestion


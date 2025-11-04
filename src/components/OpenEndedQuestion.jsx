import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'

function OpenEndedQuestion({ question, answer, onAnswerChange }) {
  return (
    <div className="question-content open-ended">
      <h2>Question {question.id}</h2>
      <p className="question-text">{question.question}</p>
      <div className="code-editor-container">
        <CodeMirror
          value={answer || question.starterCode}
          height="400px"
          extensions={[python()]}
          onChange={(value) => onAnswerChange(value)}
          theme="light"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  )
}

export default OpenEndedQuestion


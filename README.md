# Claire's Python Test Prep App

A personalized exam simulation app for Python introduction courses. This app allows Claire to practice with MCQ questions and open-ended coding questions in both exam mode (with timer) and practice mode (no timer).

## Features

- **Two Modes:**
  - **Exam Mode**: 60-minute timer with auto-submit when time runs out
  - **Practice Mode**: No timer, practice at your own pace

- **Question Types:**
  - 10 Multiple Choice Questions (MCQs) - **Auto-graded!**
  - 4 Open-ended coding questions with Python syntax highlighting

- **Dark Mode:**
  - Toggle between light and dark themes
  - Preference saved in browser
  - Dark theme for code editor

- **Instant Grading:**
  - MCQs are graded immediately after submission
  - See your score and which questions you got right/wrong
  - Open-ended questions remain ungraded (as expected)

- **Code Syntax Highlighting:**
  - Python code snippets in questions are beautifully highlighted
  - Full-featured code editor for writing solutions

- **Navigation:**
  - Sidebar with numbered buttons for quick navigation
  - Visual indicators for answered questions
  - Bookmark questions for review

- **Submission:**
  - Manual submit button
  - Auto-submit when timer expires (exam mode only)
  - Exports answers as JSON file with grading results

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Start Screen**: 
   - Choose between "Exam Mode" or "Practice Mode"
   - Toggle dark mode with the 🌙/☀️ button in the top right

2. **Taking the Exam/Practice:**
   - Use the sidebar to navigate between questions
   - Click on question numbers to jump to specific questions
   - For MCQs: Select your answer by clicking on an option
   - For open-ended questions: Write your Python code in the editor
   - Click the bookmark button (☆) to mark questions for review
   - Use Previous/Next buttons to navigate sequentially
   - Toggle dark mode anytime during the exam

3. **Submitting:**
   - Click "Submit Exam" when done
   - In exam mode, the exam auto-submits when the timer reaches 0
   - View your MCQ score and see which questions you got right/wrong
   - A JSON file with your complete answers (including grading) will be automatically downloaded

## Customization

### Modifying Questions

Edit `src/questionsData.js` to add, remove, or modify questions:

- **MCQ format:**
```javascript
{
  id: 1,
  type: 'mcq',
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0 // Index of correct option (0-3)
}
```

- **Open-ended format:**
```javascript
{
  id: 11,
  type: 'open-ended',
  question: 'Your question here',
  starterCode: 'def function_name():\n    # Write your code here\n    pass\n'
}
```

### Changing Timer Duration

In `src/components/ExamArea.jsx`, modify the initial state:
```javascript
const [timeLeft, setTimeLeft] = useState(60 * 60) // Change 60 to desired minutes
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CodeMirror** - Code editor with Python syntax highlighting
- **React Syntax Highlighter** - Syntax highlighting for code in questions
- **Pure CSS** - Styling (no CSS frameworks for simplicity)
- **LocalStorage** - Persist dark mode preference

## Credits

Favicon: [Exam icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/exam)

See [CREDITS.md](CREDITS.md) for full attribution details.

## License

MIT

export const questions = [
  // MCQ Questions (1-10)
  {
    id: 1,
    type: 'mcq',
    question: 'What is the correct way to create a variable in Python?',
    options: [
      'var x = 5',
      'int x = 5',
      'x = 5',
      'create x = 5'
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    type: 'mcq',
    question: 'Which of the following is used to define a function in Python?',
    options: [
      'function myFunc()',
      'def myFunc():',
      'func myFunc():',
      'define myFunc():'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'mcq',
    question: 'What is the output of: print(type([1, 2, 3]))?',
    options: [
      '<class \'array\'>',
      '<class \'list\'>',
      '<class \'tuple\'>',
      '<class \'dict\'>'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'mcq',
    question: 'Which keyword is used to create a class in Python?',
    options: [
      'class',
      'Class',
      'define',
      'object'
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    type: 'mcq',
    question: 'What does the len() function do?',
    options: [
      'Returns the length of an object',
      'Returns the type of an object',
      'Returns the last element',
      'Returns a random number'
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    type: 'mcq',
    question: 'Which of the following is NOT a valid data type in Python?',
    options: [
      'int',
      'float',
      'char',
      'str'
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    type: 'mcq',
    question: 'What is the correct way to start a for loop in Python?',
    options: [
      'for i in range(5):',
      'for (i = 0; i < 5; i++)',
      'foreach i in range(5)',
      'loop i to 5:'
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'mcq',
    question: 'Which method is called when an object is created in Python?',
    options: [
      '__start__()',
      '__create__()',
      '__init__()',
      '__new__()'
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    type: 'mcq',
    question: 'What is the correct way to import a module named "math"?',
    options: [
      'include math',
      'import math',
      'using math',
      'require math'
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    type: 'mcq',
    question: 'Which operator is used for floor division in Python?',
    options: [
      '/',
      '//',
      '%',
      'div'
    ],
    correctAnswer: 1
  },
  // Open-ended Questions (11-14)
  {
    id: 11,
    type: 'open-ended',
    question: 'Write a Python function called "calculate_average" that takes a list of numbers as input and returns the average. If the list is empty, return 0.',
    starterCode: 'def calculate_average(numbers):\n    # Write your code here\n    pass\n'
  },
  {
    id: 12,
    type: 'open-ended',
    question: 'Create a class called "Student" with attributes name (string) and grades (list of integers). Include a method called "get_average_grade" that returns the average of the student\'s grades.',
    starterCode: 'class Student:\n    # Write your code here\n    pass\n'
  },
  {
    id: 13,
    type: 'open-ended',
    question: 'Write a function called "count_vowels" that takes a string as input and returns the number of vowels (a, e, i, o, u) in the string. The function should be case-insensitive.',
    starterCode: 'def count_vowels(text):\n    # Write your code here\n    pass\n'
  },
  {
    id: 14,
    type: 'open-ended',
    question: 'Create a class called "Rectangle" that inherits from a base class "Shape". The Rectangle class should have width and height attributes, and a method called "calculate_area" that returns the area of the rectangle.',
    starterCode: 'class Shape:\n    def __init__(self):\n        pass\n\nclass Rectangle(Shape):\n    # Write your code here\n    pass\n'
  }
];


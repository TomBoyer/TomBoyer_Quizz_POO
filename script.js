class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

let questions = [
  new Question(
    "Quelle méthode JS permet de filtrer les éléments d'un tableau",
    ["indexOF()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode JS permet de vérifier si un élément figure dans un tableau",
    ["isName()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transform du JSON en un objet JS",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS()"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet JS permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];
console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

//regroup all functions relativ to the app display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    let endQuizHTML = `
      <h1>Quiz Terminé !</h1>
      <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      `;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
progress : function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1
    this.elementShown('progress', 'Question ' + currentQuestionNumber + " sur " + quiz.questions.length)
}

};

//game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    //End
    display.endQuiz();
  } else {
    //Logic to continue
    //question
    display.question();
    //choice
    display.choices();
    //progress
    display.progress()
  }
};

//create quiz
let quiz = new Quiz(questions);
quizApp();
console.log(quiz);

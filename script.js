const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<script>", correct: false },
            { text: "<css>", correct: false },
            { text: "<style>", correct: true },
            { text: "<link>", correct: false }
        ]
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id='demo'>This is a demonstration.</p>",
        answers: [
            { text: "document.getElementByName('p').innerHTML = 'Hello World!';", correct: false },
            { text: "document.getElementById('demo').innerHTML = 'Hello World!';", correct: true },
            { text: "document.getElement('p').innerHTML = 'Hello World!';", correct: false },
            { text: "#demo.innerHTML = 'Hello World!';", correct: false }
        ]
    },
    {
        question: "Which property is used to change the background color?",
        answers: [
            { text: "bgcolor", correct: false },
            { text: "color", correct: false },
            { text: "background-color", correct: true },
            { text: "background", correct: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "msgBox('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true }
        ]
    },
    {
        question: "Which of these is a popular JavaScript framework?",
        answers: [
            { text: "Laravel", correct: false },
            { text: "React", correct: true },
            { text: "Django", correct: false },
            { text: "Flask", correct: false }
        ]
    },
    {
        question: "What does the 'flexbox' layout model in CSS specialize in?",
        answers: [
            { text: "Creating complex table layouts", correct: false },
            { text: "Animating elements on a page", correct: false },
            { text: "One-dimensional layouts and alignment", correct: true },
            { text: "Handling server-side requests", correct: false }
        ]
    },
    {
        question: "Which git command is used to upload the local repository content to a remote repository?",
        answers: [
            { text: "git commit", correct: false },
            { text: "git add", correct: false },
            { text: "git push", correct: true },
            { text: "git pull", correct: false }
        ]
    }
];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const answerButtons = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hidden');
    scoreScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showQuestion(question) {
    questionText.innerText = question.question;
    questionCounter.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn', 'w-full', 'bg-slate-700', 'hover:bg-slate-600', 'text-white', 'font-medium', 'py-3', 'px-4', 'rounded-lg', 'text-left', 'border-2', 'border-slate-600');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === 'true';

    if (correct) {
        score++;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
    }
    
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true' && !correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtn.classList.remove('hidden');
}

function showScore() {
    quizScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    scoreText.innerText = `You scored ${score} out of ${questions.length}.`;
}
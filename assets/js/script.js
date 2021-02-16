const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");
let questionCounter = 0;

// object containing information for questions including question string, answer strings, and response message
let questions = [
    {
        question: "This is the question text for question 1", 
        answers: [
            {
                answerString: "This is the correct answer for question 1",
                answerMessage: "Good job on getting question 1 correct",
                isCorrectAnswer: true
            },
            {
                answerString: "This is the first wrong answer for question 1",
                answerMessage: "You chose the first wrong answer for question 1",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the second wrong answer for question 1",
                answerMessage: "You chose the second wrong answer for question 1",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the third wrong answer for question 1",
                answerMessage: "You chose the third wrong answer for question 1",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "This is the question text for question 2", 
        answers: [
            {
                answerString: "This is the correct answer for question 2",
                answerMessage: "Good job on getting question 2 correct",
                isCorrectAnswer: true
            },
            {
                answerString: "This is the first wrong answer for question 2",
                answerMessage: "You chose the first wrong answer for question 2",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the second wrong answer for question 2",
                answerMessage: "You chose the second wrong answer for question 2",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the third wrong answer for question 2",
                answerMessage: "You chose the third wrong answer for question 2",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "This is the question text for question 3", 
        answers: [
            {
                answerString: "This is the correct answer for question 3",
                answerMessage: "Good job on getting question 3 correct",
                isCorrectAnswer: true
            },
            {
                answerString: "This is the first wrong answer for question 3",
                answerMessage: "You chose the first wrong answer for question 3",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the second wrong answer for question 3",
                answerMessage: "You chose the second wrong answer for question 3",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the third wrong answer for question 3",
                answerMessage: "You chose the third wrong answer for question 3",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "This is the question text for question 4", 
        answers: [
            {
                answerString: "This is the correct answer for question 4",
                answerMessage: "Good job on getting question 4 correct",
                isCorrectAnswer: true
            },
            {
                answerString: "This is the first wrong answer for question 4",
                answerMessage: "You chose the first wrong answer for question 4",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the second wrong answer for question 4",
                answerMessage: "You chose the second wrong answer for question 4",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the third wrong answer for question 4",
                answerMessage: "You chose the third wrong answer for question 4",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "This is the question text for question 5", 
        answers: [
            {
                answerString: "This is the correct answer for question 5",
                answerMessage: "Good job on getting question 5 correct",
                isCorrectAnswer: true
            },
            {
                answerString: "This is the first wrong answer for question 5",
                answerMessage: "You chose the first wrong answer for question 5",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the second wrong answer for question 5",
                answerMessage: "You chose the second wrong answer for question 5",
                isCorrectAnswer: false
            },
            {
                answerString: "This is the third wrong answer for question 5",
                answerMessage: "You chose the third wrong answer for question 5",
                isCorrectAnswer: false
            }
        ]
    }
];

// generates and populates content for main element on landing page
const createIntroEl = function() {
    stringThing = `
        <div>
            <h2>Welcome to the Quizzinator</h2>
            <h3>Test your skills. Compete With Friends. Destroy Your Enemies.</h3>
            <p>In the quizzinator, you will be tested on your JavaScipt knowledge. Answer each question to reach the end and receive a high score!</p>
            <h3>Rules:</h3>
            <ul>
                <li>There are 5 questions. You must complete each question to finish the round.</li>
                <li>You have 120 seconds to finish the round.</li>
                <li>15 seconds will be deducted from your time for each wrong answer you select.</li>
                <li>Your high score will equal the amount of time left after completing all 5 questions.</li>
                <li>Click 'Start Quiz' to begin your next trial.</li>
            </ul>
            <button class="btn" id="start-button" type="button">Start Quiz</button>
        </div>
    `

    let mainDivEl = document.createElement("div");
    mainDivEl.innerHTML = stringThing;
    mainEl.appendChild(mainDivEl);
};

// handles function calls on click of start button on landing page
const startQuizHandler = function() {
    // remove main content and add new question (generateQuestion)
    let targetEl = event.target;

    if (targetEl.matches("#start-button")) {
        removeMainContent();
        createQuestionEl();
    }

    // add and start timer

};

// removes content from main element
const removeMainContent = function() {
    let previousDivEl = document.querySelector("main div");
    previousDivEl.remove();
};

// generates question content; populates question content to main element
const createQuestionEl = function() {
    let mainDivEl = document.createElement("div");
    mainDivEl.innerHTML = `
    <h2>Q1: ${questions[0].question}</h2>
    <div class='answer-block'>
        <button class='answer' type='button'>A: ${questions[0].answers[0].answerString}</button>
        <button class='answer' type='button'>B: ${questions[0].answers[1].answerString}</button>
        <button class='answer' type='button'>C: ${questions[0].answers[2].answerString}</button>
        <button class='answer' type='button'>D: ${questions[0].answers[3].answerString}</button>
    </div>
    `;
    mainEl.appendChild(mainDivEl);
};

const answersHandler = function() {
    let targetEl = event.target;

    if (targetEl.matches(".answer")) {
        console.log("bruh, it works");
        mainEl.removeEventListener("click", answersHandler);
    }
};

createIntroEl();
mainEl.addEventListener("click", startQuizHandler);
mainEl.addEventListener("click", answersHandler);
footerEl.addEventListener("click", nextQuestionHandler);
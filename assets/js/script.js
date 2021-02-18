const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");
let questionCounter = 0;
let chosenQuestion;
let chosenQuestionAnswers;
let chosenAnswer;
let numberCorrect = 0;
let countdownTimer = 75;
let interval;
let highScore = {initials: undefined, score: 0};

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
    let mainDivEl = document.createElement("div");
    mainDivEl.className = "container-div"
    mainDivEl.innerHTML = `
        <h2 class='welcome'>Welcome to the Quizzinator</h2>
        <h3 class='subtitle'>Test your skills. Compete With Friends. Destroy Your Enemies.</h3>
        <p class='game-explainer'>In the quizzinator, you will be tested on your JavaScipt knowledge. Answer each question to reach the end and receive a high score!</p>
        <div class='rules'>    
            <h3 class='rules-title'>Rules:</h3>
            <ul class='rules-list'>
                <li>There are 5 questions. You must complete each question to finish the round.</li>
                <li>You have 75 seconds to finish the round.</li>
                <li>15 seconds will be deducted from your time for each wrong answer you select.</li>
                <li>Your high score will equal the amount of time left after completing all 5 questions.</li>
                <li>Click 'Start Quiz' to begin your next trial.</li>
            </ul>
            <button class="btn" id="start-button" type="button">Start Quiz</button>
        </div>
    `;
    mainEl.appendChild(mainDivEl);
    mainEl.addEventListener("click", startQuizHandler);
};

// handles function calls on click of start button on landing page
const startQuizHandler = function() {
    let targetEl = event.target;

    if (targetEl.matches("#start-button")) {
        removeMainContent();
        mainEl.removeEventListener("click", startQuizHandler);
        shuffleArray(questions);
        startTimer();
        createQuestionEl();
    }
};

// removes content from main element
const removeMainContent = function() {
    let previousDivEl = document.querySelector("main div");
    previousDivEl.remove();
};

// removes content from footer element
const removeFooterContent = function () {
    let previousDivEl = document.querySelector("footer div");
    previousDivEl.remove();
};

// generates question content and populates it to main element
const createQuestionEl = function() {
    chosenQuestion = questions[questionCounter];
    chosenQuestionAnswers = shuffleArray(chosenQuestion.answers);

    let mainDivEl = document.createElement("div");
    mainDivEl.className = "container-div"
    mainDivEl.innerHTML = `
        <h2 class='question-text'>Q${questionCounter + 1}: ${chosenQuestion.question}</h2>
        <div class='answer-block'>
            <button class='answer' id='0' type='button'>${chosenQuestionAnswers[0].answerString}</button>
            <button class='answer' id='1' type='button'>${chosenQuestionAnswers[1].answerString}</button>
            <button class='answer' id='2' type='button'>${chosenQuestionAnswers[2].answerString}</button>
            <button class='answer' id='3' type='button'>${chosenQuestionAnswers[3].answerString}</button>
        </div>
    `;
    mainEl.appendChild(mainDivEl);
    mainEl.addEventListener("click", answersHandler);

    reportTimer();
};

// handler for answer buttons
const answersHandler = function() {
    let targetEl = event.target;

    if (targetEl.matches(".answer")) {
        mainEl.removeEventListener("click", answersHandler);
        stopTimer();
        createFooterEl(parseInt(targetEl.id));
    }
};

// generates footer content that ocntains next question button and answer explainer text of answer at index num of chosenQuestionAnswers
const createFooterEl = function(num) {
    let footerDivEl = document.createElement("div");
    footerDivEl.className = "footer-div";
    footerDivEl.innerHTML = `
        <p>${chosenQuestionAnswers[num].answerMessage}</p>
        <button class='btn next' type='button'>Next</button>
    `
    footerEl.appendChild(footerDivEl);

    if (chosenQuestionAnswers[num].isCorrectAnswer) {
        numberCorrect++;
    } else {
        countdownTimer -= 15;
        if (countdownTimer <= 0) {
            return gameOver();
        }
        reportTimer();
    }

    footerEl.addEventListener("click", nextQuestionHandler);
};

// handler for next question and finish quiz buttons
const nextQuestionHandler = function() {
    let targetEl = event.target;
    
    if (targetEl.matches(".next")) {
        questionCounter++;
        removeFooterContent();
        removeMainContent();
        footerEl.removeEventListener("click", nextQuestionHandler);
        if (questionCounter < questions.length) {
            startTimer();
            createQuestionEl();
        } else {
            document.getElementById("timer").innerHTML = "";
            createEndEl();
        }
    }
};

// generates quiz end page and populates it to main element
const createEndEl = function() {    
    let loadHighScore = localStorage.getItem("highScore");
    if (loadHighScore) {
        highScore = JSON.parse(loadHighScore);
    }


    let highScoreString;
    if (!highScore.score || countdownTimer > highScore.score) {
        highScore.initials = window.prompt(`Congratulations on finishing with the high score of ${countdownTimer}.\nPlease enter your intials to be memorialized for your heroic performance.`);
        highScore.score = countdownTimer;
        highScoreString = `<p>Congratulations! You got the high score of ${countdownTimer} with ${numberCorrect} correct answers.\nThis will surely make history!</p>`;
    } else if (highScore.score > countdownTimer) {
        highScoreString = `Congratulations on finishing with ${numberCorrect} correct. Unfortunately, you did not get the highScore.`;
    }
    

    let mainDivEl = document.createElement("div");
    mainDivEl.className = "container-div end-div"
    mainDivEl.innerHTML = `
        <p>${highScoreString}\nHigh Score: ${highScore.score} set by ${highScore.initials}\nDo you want to have another go?</p>
        <button class='restart btn' id='restart-button' type='button'>Play Again?</button>
    `

    mainEl.appendChild(mainDivEl);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    mainEl.addEventListener("click", restartQuizHandler);
};

// handler for restart quiz button
const restartQuizHandler = function() {
    let targetEl = event.target;

    if (targetEl.matches("#restart-button")) {
        removeMainContent();
        createIntroEl();
        questionCounter = 0;
        numberCorrect = 0;
        countdownTimer = 75;
    }
};

// shuffle positions of array randomly using Durstenfeld (Fisher-Yates) shuffle
const shuffleArray = function(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

const countdown = function() {
    countdownTimer--;
    reportTimer();
    if (countdownTimer <= 0) {
        return gameOver();
    }
};

const startTimer = function() {
    interval = setInterval(countdown, 1000);
};

const stopTimer = function() {
    clearInterval(interval);
};

const reportTimer = function() {
    document.getElementById("timer").innerHTML = countdownTimer;
};

const gameOver = function() {
    stopTimer();
    document.getElementById("timer").innerHTML = "";
    if (footerEl.hasChildNodes()) {
        removeFooterContent();
    };
    removeMainContent();
    let mainDivEl = document.createElement("div");
    mainDivEl.className = "container-div end-div";
    mainDivEl.innerHTML = `
        <p>You ran out of time.</p>
        <p>Finish the quiz to join the completionists and see the high scores!</p>
        <button class='btn restart' id='restart-button' type='button'>Play Again?</button>
    `;
    mainEl.appendChild(mainDivEl);
    mainEl.addEventListener("click", restartQuizHandler);
};

createIntroEl();
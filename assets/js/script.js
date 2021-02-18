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
        question: "Which conditional would not evaluate to true?", 
        answers: [
            {
                answerString: "(10 === 10 && 4 + 3 !== 7)",
                answerMessage: "Good job! && means that both sides of the conditional must be true in order for the entire conditional to evaluate to true. Since 4+3!=7 is false, the entire conditional evaluates to false.",
                isCorrectAnswer: true
            },
            {
                answerString: "(10)",
                answerMessage: "That is incorrect. 10 is a truthy value. Common falsy values in JavaScript include false, 0, -0, \"\", null, undefined, and NaN. Most other values will evaluate to true on their own.",
                isCorrectAnswer: false
            },
            {
                answerString: "(10 === 8 || 5 + 5 === 10)",
                answerMessage: "That is incorrect. This expression evaluates to true because 5+5===10 evaluates to true and the or operator (||) evaluates to true if either side of the or statement evaluate to true.",
                isCorrectAnswer: false
            },
            {
                answerString: "(5 !== 5 + 1 && 1 + 1 !== 3)",
                answerMessage: "That is incorrect. Both sides of the && evaluate to true so the whole conditional evaluates to true.",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "What is the correct way to access the element 'elephant' in the following array?<br />let animalArray = ['tiger', 'lion', 'elephant', 'zebra']", 
        answers: [
            {
                answerString: "animalArray[2]",
                answerMessage: "Correct! 'elephant' is located at index 2 of animalArray.",
                isCorrectAnswer: true
            },
            {
                answerString: "animalArray[3]",
                answerMessage: "Incorrect. 'elephant' is located at index 2 of animalArray.",
                isCorrectAnswer: false
            },
            {
                answerString: "animalArray{3}",
                answerMessage: "Incorrect. Array elements are called at an index through square braces []. Also, 'elephant' is located at index 2 of animalArray.",
                isCorrectAnswer: false
            },
            {
                answerString: "animalArray.3",
                answerMessage: "Incorrect. The correct syntax for getting an element of an array is array[index]. What index would 'elephant' be at?",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "Which function would not log 'This works!' when called?", 
        answers: [
            {
                answerString: "const thisIsAFunction() = {console.log('This works!');};",
                answerMessage: "Correct! This is not correct syntax for defining a function.",
                isCorrectAnswer: true
            },
            {
                answerString: "function thisIsAFunction() {console.log('This works!);};",
                answerMessage: "Incorrect. This is correct syntax for a function declaration.",
                isCorrectAnswer: false
            },
            {
                answerString: "const thisIsAFunction = () => console.log('This works!);",
                answerMessage: "Incorrect. This is correct arrow function syntax.",
                isCorrectAnswer: false
            },
            {
                answerString: "const thisIsAFunction = function() {console.log('This works!');};",
                answerMessage: "Incorrect. This is correct function expression syntax.",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "Which method of the window object would create a popup with a textbox entry?", 
        answers: [
            {
                answerString: "window.prompt('This is it!');",
                answerMessage: "Correct! The .prompt method creates a popup witha text entry and returns the value of the user's input.",
                isCorrectAnswer: true
            },
            {
                answerString: "window.alert('I think this one is correct.');",
                answerMessage: "Incorrect. The .alert method shows the message passed as an argument, but the user has no option to input text.",
                isCorrectAnswer: false
            },
            {
                answerString: "window.confirm('This is definitely the one.');",
                answerMessage: "Incorrect. The .confirm method gives the option of 'OK' and 'Cancel' but does not allow text entry.",
                isCorrectAnswer: false
            },
            {
                answerString: "window.getUserInput('This looks promising.');",
                answerMessage: "Incorrect. The .getUserInput method is not a native method for the window object.",
                isCorrectAnswer: false
            }
        ]
    },
    {
        question: "Which statement is true about for loops?", 
        answers: [
            {
                answerString: "for loops are appropriate when looping a predetermined number of times.",
                answerMessage: "Correct. You always want to set conditionals that tell the for loop to stop iterating when specific conditions are met.",
                isCorrectAnswer: true
            },
            {
                answerString: "for loops always run an unknown number of times.",
                answerMessage: "Incorrect. A for loop will run a predetermined number of times depending on the conditions set for them.",
                isCorrectAnswer: false
            },
            {
                answerString: "for loops can never result in an infinite loop.",
                answerMessage: "Incorrect. Infinite loops can occur when the conditions of the for loop are written in such a way that the end condition is never met.",
                isCorrectAnswer: false
            },
            {
                answerString: "for loops always count from 0 upwards.",
                answerMessage: "Incorrect. A for loop can increment starting from any number, and even increment downwards!",
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
        getInitials();
        highScore.score = countdownTimer;
        highScoreString = `<p>Congratulations! You got the high score of ${countdownTimer} with ${numberCorrect} correct answers.This will surely make history!</p>`;
    } else if (highScore.score > countdownTimer) {
        highScoreString = `Congratulations on finishing with ${numberCorrect} correct. Unfortunately, you did not get the high score.`;
    }
    

    let mainDivEl = document.createElement("div");
    mainDivEl.className = "container-div end-div"
    mainDivEl.innerHTML = `
        <p>${highScoreString}</p><br/>
        <p>High Score: ${highScore.score} set by ${highScore.initials}</p><br />
        <p>Do you want to have another go?</p>
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

const getInitials = function() {
    highScore.initials = window.prompt(`Congratulations on finishing with the high score of ${countdownTimer}.\nPlease enter your intials to be memorialized for your heroic performance.`);
    if (!highScore.initials || highScore.initials.length > 3) {
        window.alert("Please enter a set of 1-3 characters for your intitials.")
        return getInitials();
    }
};

document.addEventListener('DOMContentLoaded', createIntroEl());
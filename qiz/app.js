var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        option1: 'script',
        option2: 'javascrip',
        option3: 'js',
        correctOption: 'script',
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        option1: 'The head section',
        option2: 'The body section',
        option3: 'Both the head and "body" section are correct',
        correctOption: 'The body section',
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        option1: 'scripr href=xxx.js',
        option2: 'scripr name=xxx.js',
        option3: 'scripr src=xxx.js',
        correctOption: 'scripr src=xxx.js',
    }
];

var index = 0;
var score = 0;
var timer;
var timeLeft = 60000; // 1 minute in milliseconds (60,000 ms)
var nextBtn = document.getElementById("Next");
var previousBtn = document.getElementById("Previous");
var questionBox = document.getElementById("questionBox");
var timeDisplay = document.getElementById("time");

function startTimer() {
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        } else {
            timeLeft -= 1000; // Decrease time by 1 second (1000 ms)
            var minutes = Math.floor(timeLeft / 60000);
            var seconds = Math.floor((timeLeft % 60000) / 1000);
            timeDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function showQuestions() {
    nextBtn.disabled = true;
    previousBtn.disabled = (index === 0); // Disable 'Previous' on the first question
    if (!questions[index]) {
        Swal.fire({
            title: "QUIZ",
            text: "congradulations you complete the quiz",
            icon: "succes"
          });
        questionBox.innerHTML = `Quiz completed. Your score is ${score}`;
        nextBtn.style.display = "none";
        previousBtn.style.display = "none";
    } else {
        var q = questions[index];
        questionBox.innerHTML = `
            <p>${q.question}</p>
            <label>
                <input type="radio" name="option" value="${q.option1}">
                ${q.option1}
            </label>
            <br>
            <label>
                <input type="radio" name="option" value="${q.option2}">
                ${q.option2}
            </label>
            <br>
            <label>
                <input type="radio" name="option" value="${q.option3}">
                ${q.option3}
            </label>
        `;
        selectingOptions();
    }
}

function next() {
    var options = document.getElementsByName("option");
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            if (options[i].value === questions[index].correctOption) {
                score++;
                console.log(score);
            }
        }
    }
    index++;
    showQuestions();
}

function previous() {
    index--;
    showQuestions();
}

function selectingOptions() {
    var options = document.getElementsByName("option");
    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function () {
            nextBtn.disabled = false;
        });
    }
}

function endQuiz() {
    questionBox.innerHTML = `Time's up! Your score is ${score}`;
    nextBtn.style.display = "none";
    previousBtn.style.display = "none";
}

function initializeQuiz() {
    startTimer();
    showQuestions();
}

// Event listeners for buttons
nextBtn.addEventListener("click", next);
previousBtn.addEventListener("click", previous);

// Initialize the quiz and start the timer
initializeQuiz();

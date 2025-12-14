let quizData = [];
let currentQuestion = 0;
let score = 0;
const continent = document.body.dataset.continent;



fetch("./quizData.json")
    .then(response => response.json())
    .then(data => data[continent])
    .then(data => {
        quizData = data;
        showQuestion();
    })
    .catch(err => console.error("Failed to load quiz data:", err));

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");

function showQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary";
        btn.textContent = option;
        btn.onclick = () => selectAnswer(btn, option);
        optionsEl.appendChild(btn);
    });
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function selectAnswer(btn, selected) {
    const correct = quizData[currentQuestion].answer;

    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

    if (selected === correct) {
        score++;
        btn.classList.replace("btn-outline-primary", "btn-success");
        feedbackEl.textContent = "Correct! 🎉";
    } else {
        btn.classList.replace("btn-outline-primary", "btn-danger");
        feedbackEl.textContent = `Wrong! 😢 Correct answer: ${correct}`;
        Array.from(optionsEl.children).forEach(btn => {
            if (btn.textContent === correct) {
                btn.classList.replace("btn-outline-primary", "btn-success");
            }
        });
    }

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    progressEl.textContent = "";
    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
}

let quizData = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
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
    const current = quizData[currentQuestion]
    const correct = current.answer;
    const explanation = current.explanation;

    userAnswers[currentQuestion] = {
        question: current.question,
        selected: selected,
        correct: correct,
        explanation: explanation,
        isCorrect: selected === correct,
        image: current.image
    };

    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

    if (selected === correct) {
        score++;
        btn.classList.replace("btn-outline-primary", "btn-success");
        feedbackEl.innerHTML = `
            <strong>Correct! 🎉</strong><br>
            <small>${explanation}</small>
            <img src="${current.image}" alt="${correct}" style="max-width:200px; margin-top:10px; border-radius:8px;">
        `;
    } else {
        btn.classList.replace("btn-outline-primary", "btn-danger");
        feedbackEl.innerHTML = `
            <strong>Wrong! 😢</strong><br>
            Correct answer: <strong>${correct}</strong><br>
            <small>${explanation}</small><br>
            <img src="${current.image}" alt="${correct}" style="max-width:200px; margin-top:10px; border-radius:8px;">
        `;
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
    feedbackEl.innerHTML = `
            <div class="mt-4">
                <h5>Answer Review</h5>
                ${userAnswers.map((item, index) => `
                    <div class="card mb-3">
                        <div class="card-body">
                            <p><strong>Q${index + 1}:</strong> ${item.question}</p>
                            <p>
                                Your answer:
                                <span class="${item.isCorrect ? 'text-success' : 'text-danger'}">
                                    ${item.selected}
                                </span>
                            </p>
                            ${
                                item.isCorrect
                                    ? ''
                                    : `<p>Correct answer: <span class="text-success">${item.correct}</span></p>`
                            }
                            <p class="text-muted"><small>Explanation: ${item.explanation}</small></p>
                             <img src="${item.image}" alt="${item.correct}" style="max-width:180px; margin-top:8px; border-radius:8px;">
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
}
const quizData = [
    {
      type: "single",
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      type: "multi",
      question: "Which of the following are programming languages?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      answer: ["JavaScript", "Python"]
    },
    {
      type: "fill",
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheets"
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const submitBtn = document.getElementById("submit");
  const restartBtn = document.getElementById("restart");
  const resultsContainer = document.getElementById("results");
  
  function buildQuiz() {
    const output = [];
  
    quizData.forEach((q, index) => {
      let answers = "";
  
      if (q.type === "single") {
        answers = q.options.map(opt =>
          `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>`
        ).join("");
      } else if (q.type === "multi") {
        answers = q.options.map(opt =>
          `<label><input type="checkbox" name="q${index}" value="${opt}"> ${opt}</label>`
        ).join("");
      } else if (q.type === "fill") {
        answers = `<input type="text" name="q${index}" placeholder="Type your answer here...">`;
      }
  
      output.push(`
        <div class="question">
          <h3>${index + 1}. ${q.question}</h3>
          <div class="answers">${answers}</div>
        </div>
      `);
    });
  
    quizContainer.innerHTML = output.join("");
  }
  
  function calculateScore() {
    let score = 0;
  
    quizData.forEach((q, index) => {
      const name = `q${index}`;
      const questionDiv = document.querySelector(`[name="${name}"]`).closest(".question");
  
      if (q.type === "single") {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected && selected.value === q.answer) {
          score++;
        }
      } else if (q.type === "multi") {
        const selectedOptions = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
        if (arraysEqual(selectedOptions.sort(), q.answer.sort())) {
          score++;
        }
      } else if (q.type === "fill") {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input && input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
          score++;
        }
      }
    });
  
    return score;
  }
  
  function arraysEqual(a, b) {
    return Array.isArray(a) &&
           Array.isArray(b) &&
           a.length === b.length &&
           a.every((val, index) => val === b[index]);
  }
  
  submitBtn.addEventListener("click", () => {
    const score = calculateScore();
    resultsContainer.textContent = `You scored ${score} out of ${quizData.length}`;
    submitBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
  });
  
  restartBtn.addEventListener("click", () => {
    resultsContainer.textContent = "";
    submitBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    buildQuiz();
  });
  
  buildQuiz();
  
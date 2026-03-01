let level = 1;
let correctAnswer;
let timerInterval;
let timeLeft = 20;
let rounds = 0;
const maxRounds = 10;

const compliments = {
  correct: [
    "Correct. Brain detected.",
    "Nice. You survived.",
    "Math fears you.",
    "You are dangerously intelligent."
  ],
  wrong: [
    "Wrong. Calculator is disappointed.",
    "Even 2+2 is judging you.",
    "Brain.exe stopped working.",
    "Try again, warrior."
  ],
  timeout: [
    "Time’s up. Brain lag?",
    "Clock won.",
    "Too slow. Internet faster than you.",
    "Speed 0.5x detected."
  ]
};

function showInstructions() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("instructions").classList.remove("hidden");
}

function startGame() {
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  level = 1;
  rounds = 0;
  generateQuestion();
  startTimer();
}

function generateQuestion() {
  let operators = ["+", "-", "*", "/"];
  let expression = "";
  let numOperators = Math.min(2 + level, 6);

  for (let i = 0; i < numOperators; i++) {
    let num = Math.floor(Math.random() * 10) + 1;
    expression += num;
    let op = operators[Math.floor(Math.random() * operators.length)];
    expression += op;
  }

  expression += Math.floor(Math.random() * 10) + 1;

  if (level > 2) {
    expression = "(" + expression + ")";
  }

  correctAnswer = Math.round(eval(expression));
  document.getElementById("question").innerText = expression.replace(/\*/g,"×").replace(/\//g,"÷");
  document.getElementById("level").innerText = level;
  document.getElementById("answer").value = "";
  document.getElementById("message").innerText = "";
}

function checkAnswer() {
  let userAnswer = Number(document.getElementById("answer").value);
  clearInterval(timerInterval);

  if (userAnswer === correctAnswer) {
    showMessage(randomMessage("correct"));
    level++;
  } else {
    showMessage(randomMessage("wrong"));
  }

  rounds++;
  if (rounds >= maxRounds) {
    setTimeout(showFinalScore, 1500);
    return;
  }

  setTimeout(() => {
    generateQuestion();
    startTimer();
  }, 1500);
}

function startTimer() {
  timeLeft = 20;
  document.getElementById("timer").innerText = timeLeft;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showMessage(randomMessage("timeout"));
      rounds++;
      if (rounds >= maxRounds) {
        setTimeout(showFinalScore, 1500);
        return;
      }
      setTimeout(() => {
        generateQuestion();
        startTimer();
      }, 1500);
    }
  }, 1000);
}

function showMessage(msg) {
  document.getElementById("message").innerText = msg;
}

function randomMessage(type) {
  let arr = compliments[type];
  return arr[Math.floor(Math.random() * arr.length)];
}

function showCreator() {
  window.open("https://instagram.com/hello._.siva", "_blank");
}

function showFinalScore() {
  document.getElementById("game").innerHTML = `
    <h2>Game Over</h2>
    <p>Your final level: ${level}</p>
    <p>Math isn't easy dude 😎, practice it and master it 🥰, thank me later! Don't forget to follow me on Instagram</p>
    <button class="play-btn" onclick="startGame()">Play Again</button>
  `;
}

/* Falling operators animation */
function createOperator() {
  const symbols = ["+", "-", "*", "/", "=", "(", ")"];
  const span = document.createElement("span");
  span.classList.add("operator");
  span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDuration = (3 + Math.random() * 5) + "s";
  document.body.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 8000);
}

setInterval(createOperator, 500);
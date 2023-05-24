const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const scoreDisplay = document.querySelector("#score");
const timeLeftDisplay = document.querySelector("#time-left");

let score = 0;
let moleSquareId;
let timeLeft = 20;
let timerId = null;

function loadMoleOnRandomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  moleSquareId = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === moleSquareId) {
      score++;
      scoreDisplay.textContent = score;
      moleSquareId = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(loadMoleOnRandomSquare, 500);
}

moveMole();

function timerCountDown() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("TIME'S UP! Your final score is " + score);
  }
}

let countDownTimerId = setInterval(timerCountDown, 1000);

const possibleChoices = ["Rock", "Paper", "Scissors"];

const computerChoice = document.getElementById("computer-choice");
const userChoice = document.getElementById("user-choice");
const result = document.getElementById("result");
const choiceButtons = document.querySelectorAll("button");
let userButtonSelect;

choiceButtons.forEach((choice) =>
  choice.addEventListener("click", (e) => {
    userButtonSelect = e.target.id;
    userChoice.innerHTML = userButtonSelect;
    computerChoice.innerHTML = generateComputerChoice();
    result.innerHTML = getResult(userButtonSelect, computerChoice.innerHTML);
  })
);

function generateComputerChoice() {
  let randomNumber = Math.floor(Math.random() * choiceButtons.length);
  let computerSelect = possibleChoices[randomNumber];
  return computerSelect;
}

function getResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "Draw!";
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Paper" && computerChoice === "Rock") ||
    (userChoice === "Scissors" && computerChoice === "Paper")
  ) {
    return "User Wins!";
  }
  return "Computer Wins!";
}

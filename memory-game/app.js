const cardArray = [
  {
    name: "cheeseburger",
    image: "images/cheeseburger.png",
  },
  {
    name: "fries",
    image: "images/fries.png",
  },
  {
    name: "hotdog",
    image: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    image: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    image: "images/milkshake.png",
  },
  {
    name: "pizza",
    image: "images/pizza.png",
  },
  {
    name: "cheeseburger",
    image: "images/cheeseburger.png",
  },
  {
    name: "fries",
    image: "images/fries.png",
  },
  {
    name: "hotdog",
    image: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    image: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    image: "images/milkshake.png",
  },
  {
    name: "pizza",
    image: "images/pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardMatches = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("id", i);
    gridDisplay.appendChild(card);
    card.addEventListener("click", flipCard);
  }
}

function flipCard() {
  let cardId = this.getAttribute("id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].image);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("#grid img");

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[cardsChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    if (cardMatches.length !== cardArray.length / 2 - 1) {
      alert("You found a match!");
    }
    cardMatches.push(cardsChosen);
  } else if (cardsChosenIds[0] === cardsChosenIds[1]) {
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    alert("You picked the same card!");
  } else {
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    alert("Try again!");
  }
  resultDisplay.innerHTML = cardMatches.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardMatches.length === cardArray.length / 2) {
    resultDisplay.innerHTML = "All!";
    alert("Congratulations you found them all!");
  }
}

createBoard();

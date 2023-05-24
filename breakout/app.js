const grid = document.querySelector(".grid");

const gridHeight = 300;
const gridWidth = 600;

const blockHeight = 20;
const blockWidth = 100;

const ballDiameter = 20;

const userStartPosition = [230, 10];
let userCurrentPosition = userStartPosition;

const ballStartPosition = [270, 50];
let ballCurrentPosition = ballStartPosition;

let xBallDirection = 5;
let yBallDirection = 5;

let timerId;

class Block {
  constructor(x, y) {
    (this.bottomLeft = [x, y]),
      (this.topLeft = [x, y + blockHeight]),
      (this.bottomRight = [x + blockWidth, y]),
      (this.topRight = [x + blockWidth, y + blockHeight]);
  }
}

const blocks = [
  new Block(10, 270),
  new Block(10, 240),
  new Block(10, 210),
  new Block(120, 270),
  new Block(120, 240),
  new Block(120, 210),
  new Block(230, 270),
  new Block(230, 240),
  new Block(230, 210),
  new Block(340, 270),
  new Block(340, 240),
  new Block(340, 210),
  new Block(450, 270),
  new Block(450, 240),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

const userBlock = document.createElement("div");
userBlock.classList.add("user");
grid.appendChild(userBlock);
drawUser();

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

function drawUser() {
  userBlock.style.left = userCurrentPosition[0] + "px";
  userBlock.style.bottom = userCurrentPosition[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      userCurrentPosition[0] -= 10;
      drawUser();
      break;
    case "ArrowRight":
      userCurrentPosition[0] += 10;
      drawUser();
      break;
  }
}
document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xBallDirection;
  ballCurrentPosition[1] += yBallDirection;
  drawBall();
  checkForWallCollisions();
  checkForUserBlockCollisions();
  checkForBlockCollisions();
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    alert("You lose!");
    document.removeEventListener("keydown", moveUser);
  }
}

timerId = setInterval(moveBall, 100);

function checkForWallCollisions() {
  if (ballCurrentPosition[1] + ballDiameter === gridHeight) {
    yBallDirection = -yBallDirection;
  } else if (
    ballCurrentPosition[0] + ballDiameter === gridWidth ||
    ballCurrentPosition[0] === 0
  ) {
    xBallDirection = -xBallDirection;
  }
}

function checkForUserBlockCollisions() {
  if (
    ballCurrentPosition[0] > userCurrentPosition[0] &&
    ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
    ballCurrentPosition[1] === userCurrentPosition[1] + blockHeight
  ) {
    yBallDirection = -yBallDirection;
  }
}

function checkForBlockCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    const allBlocks = Array.from(document.querySelectorAll(".block"));
    if (
      ballCurrentPosition[0] + 0.5 * ballDiameter > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] - 0.5 * ballDiameter
    ) {
      if (
        ballCurrentPosition[1] + ballDiameter === blocks[i].bottomLeft[1] ||
        ballCurrentPosition[1] === blocks[i].bottomLeft[1] + blockHeight
      ) {
        yBallDirection = -yBallDirection;
        allBlocks[i].classList.remove("block");
        blocks.splice(i, 1);
        if (blocks.length == 0) {
          alert("You Win!");
          clearInterval(timerId);
          document.removeEventListener("keydown", moveUser);
        }
      }
    } else if (
      ballCurrentPosition[1] + 0.5 * ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1] - 0.5 * ballDiameter
    ) {
      if (
        ballCurrentPosition[0] + ballDiameter === blocks[i].bottomLeft[0] ||
        ballCurrentPosition[0] === blocks[i].bottomLeft[0] + blockWidth
      ) {
        xBallDirection = -xBallDirection;
        allBlocks[i].classList.remove("block");
        blocks.splice(i, 1);
        if (blocks.length == 0) {
          alert("You win!");
          clearInterval(timerId);
          document.removeEventListener("keydown", moveUser);
        }
      }
    }
  }
}

function changeBallDirection() {}

addBlocks();

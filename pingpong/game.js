//* GAME VARIABLES *//
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 512;
let canvasHeight = 512;
let framesPerSecond = 30;

let paddleHeight = canvasHeight / 6;
let paddleWidth = canvasWidth / 50;

let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = 10;

let playerYSpeed = 10;

//* GAME FUNCTIONS *//
const startGame = () => {
  // Set up the canvas
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Set up the game loop
  setInterval(() => {
    drawEverything();
    movePlayer();
  }, 1000 / framesPerSecond);

  // Set up the event listeners for keys
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
};

const keyDownHandler = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      console.log('up');
      break;
    case 'ArrowDown':
      console.log('down');
      break;
    default:
      break;
  }
};

const keyUpHandler = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      console.log('up');
      break;
    case 'ArrowDown':
      console.log('down');
      break;
    default:
      break;
  }
};

const drawEverything = () => {
  // Draw the left paddle
  drawPaddle(10, canvasHeight / 2);
  drawPaddle(canvasWidth - 20, canvasHeight / 2);
};

const drawPaddle = (x, y) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(x, y - paddleHeight / 2, paddleWidth, paddleHeight);
};

const movePlayer = () => {
  // Move the player
};

startGame();

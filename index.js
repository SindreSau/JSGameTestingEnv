import Game from './game.js';

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('canvas');
canvas.style.width = '98vw';
canvas.style.maxWidth = '500px';
canvas.style.minWidth = '100px';
canvas.style.aspectRatio = '1/1';
let ctx = canvas.getContext('2d');
let cWidth = canvas.clientWidth;
let cHeight = canvas.clientHeight;
// console.log(cWidth, cHeight);
canvas.width = cWidth;
canvas.height = cHeight;

let game = new Game(cWidth, cHeight, canvas);

if (isTouchDevice()) {
  document.body.style.webkitUserSelect = 'none';
  document.getElementById('touch-controls').style.display = 'flex';
  document.getElementById('touch-controls').style.flexDirection = 'column';
  document.getElementById('keyboard-controls').style.display = 'none';
} else {
  document.getElementById('touch-controls').style.display = 'none';
  document.getElementById('keyboard-controls').style.display = 'block';
}

game.start();

let lastTime = 0;
const gameLoop = (timeStamp) => {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp;

  // Clear screen, as drawing on canvas keeps old elements
  ctx.clearRect(0, 0, cWidth, cHeight);

  // Update position
  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

//* Returns true if device is touch device
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

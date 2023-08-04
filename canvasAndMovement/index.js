import Game from './game.js';

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let wh = 512;
let cWidth = wh;
let cHeight = wh;
canvas.width = cWidth;
canvas.height = cHeight;

let game = new Game(cWidth, cHeight);
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

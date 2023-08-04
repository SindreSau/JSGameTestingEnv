let GAME_WIDTH = 512;
let GAME_HEIGHT = 512;

function startGame() {
  gameArea = new GameArea(GAME_WIDTH, GAME_HEIGHT);
  let car = new Car(50, 50, '/car/car.png');
  car.update();
  gameArea.start();
}

class GameArea {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
  start() {
    this.interval = setInterval(updateGameArea, 20);
  }
}

class Car {
  constructor(width, height, imageSrc) {
    this.width = width;
    this.height = height;
    this.backgroundColor = 'red';
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = 0;
    this.y = 0;
  }

  update() {
    let ctx = gameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

startGame();

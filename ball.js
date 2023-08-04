export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeigth = game.gameHeight;
    this.image = document.getElementById('imgBall');

    this.game = game;

    this.ballSize = 20;

    this.position = {
      x: this.gameWidth / 2,
      y: this.gameHeigth / 100,
    };

    this.speed = {
      x: Math.random() * 2 - 1,
      y: this.gameHeigth / 100,
    };
  }

  draw(ctx) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.ctx.drawImage(
      this.image,
      this.position.x - this.ballSize / 2, //center
      this.position.y,
      this.gameWidth / this.ballSize,
      this.gameHeigth / this.ballSize
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Checks wall hit left or right
    if (this.position.x + this.ballSize > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    // Checks wall hit top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // Checks paddle collision
    let bottomOfBall = this.position.y + this.ballSize;
    let leftSideOfBall = this.position.x - this.ballSize / 2;
    let rightSideOfBall = this.position.x + this.ballSize;
    let topOfPaddle = this.game.paddle.position.y;
    let leftSideOfPaddle = this.game.paddle.position.x;
    let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;
    let centerOfPaddle = this.game.paddle.position.x + this.game.paddle.width / 2;

    if (bottomOfBall >= topOfPaddle && rightSideOfBall >= leftSideOfPaddle && leftSideOfBall <= rightSideOfPaddle) {
      // console.log(sigmoid(this.position.x - centerOfPaddle).toFixed(4));
      this.speed.y = -this.speed.y;

      // Update score
      this.game.score++;

      // Setting the X-speed proportional to paddle-hit-point
      this.speed.x += sigmoid(this.position.x - centerOfPaddle);
    }

    // Checks loose condition
    if (bottomOfBall > this.gameHeigth) {
      this.speed.y = 0;
      this.speed.x = 0;
      this.game.gameOver = true;
      this.remove();
    }
  }

  remove() {
    this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
  }
}

// Custom sigmoid, returning value between -1 and 1
function sigmoid(x) {
  return 4 / (1 + Math.pow(1.1, -x)) - 2;
}

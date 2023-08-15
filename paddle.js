export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = this.gameWidth / 6;
    this.height = this.gameHeight / 50;

    this.maxSpeed = this.gameWidth / 1000;
    this.speed = 0;
    this.acceleration = 0.2;
    this.direction = 0;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - this.gameHeight / 10,
    };
  }

  moveLeft() {
    this.direction = -1;
  }

  moveRight() {
    this.direction = 1;
  }

  stop() {
    this.direction = 0;
  }

  draw(ctx) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.ctx.fillStyle = '#2fff00';
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(dt) {
    if (this.direction != 0) {
      // Acceleration
      this.speed += this.acceleration * this.direction;
      // Clamp the speed to the maxSpeed
      this.speed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.speed));
    } else {
      // Deceleration
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - this.acceleration);
      } else {
        this.speed = Math.min(0, this.speed + this.acceleration);
      }
    }

    this.position.x += this.speed * dt;

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x > this.gameWidth - this.width) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}

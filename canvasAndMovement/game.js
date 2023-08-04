import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.scoreText = new Score(this);
    this.score = 0;
    this.scores = [];
    this.highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
    this.highScoreText = new HighScore(this);
    this.gameOver = false;

    this.gameObjects = [this.paddle, this.ball, this.scoreText];

    // Only paddle
    // this.gameObjects = [this.paddle];

    new InputHandler(this.paddle);
  }

  update() {
    this.gameObjects.forEach((ob) => ob.update());

    if (this.gameOver) {
      //update highscore
      this.highScoreText.update();

      if (confirm('Game over! Start over?')) this.start();
    }
  }

  draw(ctx) {
    this.gameObjects.forEach((ob) => ob.draw(ctx));
    this.highScoreText.draw(ctx);
  }
}

class Score {
  constructor(game) {
    this.game = game;
    this.score = this.game.score;
  }

  draw(ctx) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.ctx.font = `${this.game.gameWidth / 24}px Arial`;
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(`Score: ${this.score}`, this.game.gameWidth / 100, this.game.gameWidth / 22);
  }

  update() {
    this.score = this.game.score;
  }
}

class HighScore {
  constructor(game) {
    this.game = game;
    this.highScore = this.game.highScore;
  }

  draw(ctx) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.ctx.font = `${this.game.gameWidth / 24}px Arial`;
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(`High score: ${this.highScore}`, this.game.gameWidth / 100, this.game.gameWidth / 11);
  }

  update() {
    console.log(this.game.score);
    this.game.scores = JSON.parse(localStorage.getItem('scores')) || [];
    this.game.scores.push(this.game.score);
    localStorage.setItem('scores', JSON.stringify(this.game.scores));

    //limit scores to 10, deleting the lowest scores
    if (this.game.scores.length > 10) {
      this.game.scores.sort((a, b) => b - a);
      this.game.scores.length = 3;

      localStorage.setItem('scores', JSON.stringify(this.game.scores));
    }

    localStorage.setItem('highScore', JSON.stringify(this.game.scores.reduce((a, b) => Math.max(a, b), 0)));
  }
}

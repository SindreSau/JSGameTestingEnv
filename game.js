import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';

export default class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas = canvas;
  }

  start() {
    this.btnStart = document.getElementById('btnStart');
    this.paddle;
    this.ball;
    this.paddle = new Paddle(this);
    this.scoreText = new Score(this);
    this.score = 0;
    this.scores = [];
    this.highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
    this.highScoreText = new HighScore(this);
    this.gameOver = false;
    new InputHandler(this.paddle, this.canvas);
    this.ctx = document.querySelector('canvas').getContext('2d');

    // Start game on btn click or spacebar/enter
    this.btnStart.addEventListener('click', () => {
      this.startClicked();
    });

    addEventListener('keydown', (e) => {
      if (e.key == ' ' || e.key == 'Enter') {
        this.startClicked();
      }
    });

    // Start game on touchScreens with button
    this.mobileStartButton = document.getElementById('mobileStartBtn');
    this.mobileStartButton.addEventListener('click', () => {
      this.startClicked();
    });

    this.gameObjects = [this.paddle, this.scoreText];

    // Only paddle
    // this.gameObjects = [this.paddle];
  }

  startClicked() {
    console.log('clicked start');
    this.btnStart.style.display = 'none';
    this.ball = new Ball(this);
    this.gameObjects = [this.paddle, this.ball, this.scoreText];
  }

  update() {
    this.gameObjects.forEach((ob) => ob.update());

    if (this.gameOver) {
      //update highscore
      this.highScoreText.update();

      // Update the highscore display
      this.highScore = JSON.parse(localStorage.getItem('highScore')) || 0;

      //reset score
      this.score = 0;

      //reset game
      this.gameOver = false;
      this.btnStart.style.display = 'block';
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
    this.ctx.font = `${this.game.gameWidth / 28}px Arial`;
    this.ctx.fillStyle = 'black';
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
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`High score: ${this.highScore}`, this.game.gameWidth / 100, this.game.gameWidth / 11);
  }

  update() {
    this.game.scores = JSON.parse(localStorage.getItem('scores')) || [];
    this.game.scores.push(this.game.score);
    localStorage.setItem('scores', JSON.stringify(this.game.scores));

    //limit scores to 10, deleting the lowest scores
    if (this.game.scores.length > 10) {
      this.game.scores.sort((a, b) => b - a);
      this.game.scores.length = 3;

      localStorage.setItem('scores', JSON.stringify(this.game.scores));
    }

    //update highscore
    this.highScore = this.game.scores.reduce((a, b) => Math.max(a, b), 0);

    localStorage.setItem('highScore', JSON.stringify(this.game.scores.reduce((a, b) => Math.max(a, b), 0)));
  }
}

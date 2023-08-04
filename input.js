/* export default class InputHandler {
  constructor(paddle) {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          paddle.moveLeft();
          break;
        case 'ArrowRight':
          paddle.moveRight();
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (paddle.speed < 0) paddle.stop();
          break;
        case 'ArrowRight':
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
} */

//* GPT VERSION *//
export default class InputHandler {
  constructor(paddle) {
    this.paddle = paddle;

    this.keyOrder = [];

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        // Remove previous occurrence of 'ArrowLeft'
        this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowLeft');
        // Add 'ArrowLeft' to the end of keyOrder
        this.keyOrder.push('ArrowLeft');
        break;
      case 'ArrowRight':
        // Remove previous occurrence of 'ArrowRight'
        this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowRight');
        // Add 'ArrowRight' to the end of keyOrder
        this.keyOrder.push('ArrowRight');
        break;
    }

    this.updatePaddleMovement();
  }

  onKeyUp(e) {
    // Remove the key that was released from keyOrder
    this.keyOrder = this.keyOrder.filter((key) => key !== e.key);

    this.updatePaddleMovement();
  }

  updatePaddleMovement() {
    if (this.keyOrder.length === 0) {
      this.paddle.stop();
    } else {
      const lastKey = this.keyOrder[this.keyOrder.length - 1];
      if (lastKey === 'ArrowLeft') {
        this.paddle.moveLeft();
      } else if (lastKey === 'ArrowRight') {
        this.paddle.moveRight();
      }
    }
  }
}

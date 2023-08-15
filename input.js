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
  constructor(paddle, canvas) {
    this.paddle = paddle;
    this.canvas = canvas;

    this.keyOrder = [];

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.canvas.addEventListener('touchcancel', this.onTouchEnd.bind(this));
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

  // Touch controls - only inside of canvas
  onTouchStart(e) {
    // Move left if touch is on left side of canvas
    if (e.touches[0].clientX < window.innerWidth / 2) {
      // Remove previous occurrence of 'ArrowLeft'
      this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowLeft');
      // Add 'ArrowLeft' to the end of keyOrder
      this.keyOrder.push('ArrowLeft');
    }
    // Move right if touch is on right side of canvas
    else {
      // Remove previous occurrence of 'ArrowRight'
      this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowRight');
      // Add 'ArrowRight' to the end of keyOrder
      this.keyOrder.push('ArrowRight');
    }

    this.updatePaddleMovement();
  }

  onTouchEnd(e) {
    // Remove the key that was released from keyOrder
    this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowLeft');
    this.keyOrder = this.keyOrder.filter((key) => key !== 'ArrowRight');

    this.updatePaddleMovement();

    // Prevent scrolling
    e.preventDefault();

    // Prevent mouse click
    e.stopPropagation();
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

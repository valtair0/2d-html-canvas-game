class Sprite {
  constructor({ position, width, height, image }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
  }
}

class Character {
  constructor({ position, velocity, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.characterHeight = 150;
    this.characterWidth = 50;
    this.lastKey;
    this.offset = offset;
    this.attackbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
    };
    this.isAttacking = false;
    this.counter = 0;
    this.health = 100;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(
      this.position.x,
      this.position.y,
      this.characterWidth,
      this.characterHeight
    );

    //Attackbox
    if (this.isAttacking) {
      c.fillStyle = "blue";
      c.fillRect(
        this.attackbox.position.x,
        this.attackbox.position.y,
        this.attackbox.width,
        this.attackbox.height
      );
    }
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    this.attackbox.position.x = this.position.x + this.offset;
    this.attackbox.position.y = this.position.y;

    if (this.position.y + this.characterHeight > canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  checkCorners() {
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x > canvas.width - this.characterWidth) {
      this.position.x = canvas.width - this.characterWidth;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
    }
  }

  jump() {
    if (this.velocity.y === 0) {
      this.velocity.y = -10;
    }
  }

  attack({ attacker, defender, target }) {
    if (this.counter > 0) {
      this.isAttacking = false;
    } else {
      if (gameİsOver === false) {
        this.isAttacking = true;
        if (checkAttack({ attacker: attacker, defender: defender })) {
          defender.health -= 10;
          if (defender.health <= 0) {
            selectWinner();
          }
          document.querySelector(target).style.width = defender.health + "%";
        }
      }
    }
    this.counter++;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

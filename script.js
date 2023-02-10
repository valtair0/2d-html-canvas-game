const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = "green";
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
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

    if (this.position.y + this.characterHeight + 50 > canvas.height) {
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

  checkAttack({ attacker, defender }) {
    return (
      attacker.attackbox.position.x + attacker.attackbox.width >=
        defender.position.x &&
      attacker.attackbox.position.x <=
        defender.position.x + defender.characterWidth &&
      attacker.attackbox.position.y + attacker.attackbox.height >=
        defender.position.y &&
      attacker.attackbox.position.y <=
        defender.position.y + defender.characterHeight &&
      attacker.isAttacking
    );
  }

  attack({ attacker, defender }) {
    if (this.counter > 0) {
      this.isAttacking = false;
    } else {
      this.isAttacking = true;
      console.log(
        "hit",
        this.checkAttack({ attacker: attacker, defender: defender })
      );
    }
    this.counter++;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const Player = new Sprite({
  position: { x: 100, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: 0,
});

const Enemy = new Sprite({
  position: {
    x: canvas.width - 150,
    y: 0,
  },
  velocity: { x: 0, y: 0 },
  offset: -50,
});

const keys = {
  a: false,
  d: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let lastkey;

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  c.fillStyle = "darkgreen";
  c.fillRect(0, 0, canvas.width, canvas.height);
  Player.update();
  Enemy.update();

  Player.velocity.x = 0;
  Enemy.velocity.x = 0;

  Player.checkCorners();
  Enemy.checkCorners();

  //Player
  if (keys.a === false && keys.d === true) {
    Player.lastKey = "d";
  } else if (keys.d === false && keys.a === true) {
    Player.lastKey = "a";
  }

  if (keys.a && Player.lastKey === "a") {
    Player.velocity.x = -2.8;
  } else if (keys.d && Player.lastKey === "d") {
    Player.velocity.x = 2.8;
  }

  //Enemy
  if (keys.ArrowLeft === false && keys.ArrowRight === true) {
    Enemy.lastKey = "ArrowRight";
  } else if (keys.ArrowRight === false && keys.ArrowLeft === true) {
    Enemy.lastKey = "ArrowLeft";
  }

  if (keys.ArrowLeft && Enemy.lastKey === "ArrowLeft") {
    Enemy.velocity.x = -2.8;
  } else if (keys.ArrowRight && Enemy.lastKey === "ArrowRight") {
    Enemy.velocity.x = 2.8;
  }
}

gameLoop();

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    //Player
    case "KeyD":
      keys.d = true;
      Player.lastKey = "d";
      break;
    case "KeyA":
      keys.a = true;
      Player.lastKey = "a";
      break;
    case "KeyW":
      Player.jump();
      break;
    case "Space":
      Player.attack({ attacker: Player, defender: Enemy });
      break;

    //Enemy
    case "ArrowRight":
      keys.ArrowRight = true;
      Enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft = true;
      Enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      Enemy.jump();
      break;
    case "ArrowDown":
      Enemy.attack({ attacker: Enemy, defender: Player });
      break;

    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    //Player
    case "KeyD":
      keys.d = false;
      break;
    case "KeyA":
      keys.a = false;
      break;
    case "Space":
      Player.counter = 0;
      break;

    //Enemy
    case "ArrowRight":
      keys.ArrowRight = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = false;
      break;
    case "ArrowDown":
      Enemy.counter = 0;
      break;

    default:
      break;
  }
});

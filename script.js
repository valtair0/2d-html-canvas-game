const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = "green";
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.characterHeight = 150;
    this.characterWidth = 50;
    this.lastKey;
    this.attackbox = {
      position: this.position,
      width: 100,
      height: 50,
    };
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
    c.fillStyle = "blue";
    c.fillRect(
      this.attackbox.position.x,
      this.attackbox.position.y,
      this.attackbox.width,
      this.attackbox.height
    );
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

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
}

const Player = new Sprite({
  position: { x: canvas.width / 1.2, y: 0 },
  velocity: { x: 0, y: 0 },
});

const Enemy = new Sprite({
  position: { x: canvas.width / 8, y: 0 },
  velocity: { x: 0, y: 0 },
});

const keys = {
  a: false,
  d: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let lastkey;

function animate() {
  window.requestAnimationFrame(animate);
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

animate();

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

    //Enemy
    case "ArrowRight":
      keys.ArrowRight = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = false;
      break;

    default:
      break;
  }
});

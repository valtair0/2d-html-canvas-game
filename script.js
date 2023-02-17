const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = "green";
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
let gameİsOver = false;

const Background = new Sprite({
  position: { x: 0, y: 0 },
  image: "./png/background.png",
  width: canvas.width,
  height: canvas.height,
});

const Player = new Character({
  position: { x: 100, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: 0,
});

const Enemy = new Character({
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

decreaseTimer();

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  c.fillStyle = "darkgreen";
  c.fillRect(0, 0, canvas.width, canvas.height);
  Background.update();
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

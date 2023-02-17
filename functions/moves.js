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
      Player.attack({
        attacker: Player,
        defender: Enemy,
        target: "#enemyHealth",
      });
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
      Enemy.attack({
        attacker: Enemy,
        defender: Player,
        target: "#playerHealth",
      });
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

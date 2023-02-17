function selectWinner() {
  gameİsOver = true;
  document.querySelector("#matchResultText").style.display = "flex";
  if (Player.health === Enemy.health) {
    document.querySelector("#matchResultText").innerHTML = "Game Over Tie";
  } else if (Player.health > Enemy.health) {
    document.querySelector("#matchResultText").innerHTML = "Player Win";
  } else if (Player.health < Enemy.health) {
    document.querySelector("#matchResultText").innerHTML = "Enemy Win";
  }
}

let timeIs = 61;
function decreaseTimer() {
  if (timeIs > 0 && gameİsOver === false) {
    setTimeout(decreaseTimer, 1000);
    timeIs--;
    document.querySelector("#timer").innerHTML = timeIs;
  }

  if (timeIs === 0) {
    selectWinner();
  }
}

function checkAttack({ attacker, defender }) {
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

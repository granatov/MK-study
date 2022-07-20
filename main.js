"use strict";

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["knife", "sword"],
  attack: function (name) {
    console.log(this.name + " Fight...");
  },
};
const player2 = {
  player: 2,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["gun", "fireball"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

// const $arenas = document.querySelector(".arenas");

// function createElement(tag, className) {
//   const $tag = document.createElement(tag);

//   if (className) {
//     $tag.classList.add(className);
//   }
//   return $tag;
// }

// function createPlayer(player, name, hp) {
//   const $player = createElement("div", player);
//   const $progress = createElement("div", "progressbar");
//   const $character = createElement("div", "character");
//   const $life = createElement("div", "life");
//   const $name = createElement("div", "name");
//   const $img = createElement("img");
//   const playerHp = hp + "%";

//   $life.style.width = playerHp;
//   $name.innerText = name;

//   switch (name) {
//     case "Scorpion":
//       $img.src = "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif";
//       break;
//     case "Subzero":
//       $img.src = "http://reactmarathon-api.herokuapp.com/assets/subzero.gif";
//       break;
//     case "Kitana":
//       $img.src = "http://reactmarathon-api.herokuapp.com/assets/kitana.gif";
//       break;
//     case "Liukang":
//       $img.src = "http://reactmarathon-api.herokuapp.com/assets/liukang.gif";
//       break;
//     case "Sonya":
//       $img.src = "http://reactmarathon-api.herokuapp.com/assets/sonya.gif";
//       break;
//   }

//   $player.appendChild($character);
//   $player.appendChild($progress);
//   $progress.appendChild($life);
//   $progress.appendChild($name);
//   $character.appendChild($img);

//   return $player;
// }

// $arenas.appendChild(createPlayer("player1", "Scorpion", 100));
// $arenas.appendChild(createPlayer("player2", "Subzero", 100));

const $arenas = document.querySelector(".arenas");
const $randomBtn = document.querySelector(".button");

function createElement(tagName, className) {
  const $tag = document.createElement(tagName);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer2(obj) {
  const $player = createElement("div", "player" + obj.player);
  const $progress = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $img = createElement("img");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");

  const playerHp = obj.hp + "%";

  $img.src = obj.img;

  $life.style.width = playerHp;
  $name.innerText = obj.name;

  $player.appendChild($character);
  $player.appendChild($progress);
  $progress.appendChild($life);
  $progress.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function changeHp(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );

  player.hp -= getRandomInt(1, 20);
  $playerLife.style.width = player.hp + "%";

  if (player.hp <= 0) {
    player.hp = 0;
    $playerLife.style.width = 0 + "%";
  }
}

$randomBtn.addEventListener("click", function () {
  changeHp(player1);
  changeHp(player2);

  if (player1.hp === 0 || player2.hp === 0) {
    $randomBtn.disabled = true;
  }

  if (player1.hp <= 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
  } else if (player2.hp <= 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
  } else if (player1.hp == 0 && player2.hp == 0) {
    $arenas.appendChild(playerWin());
  }
});

function playerWin(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " win";
  } else {
    $winTitle.innerText = "drow";
  }
  return $winTitle;
}

$arenas.appendChild(createPlayer2(player1));
$arenas.appendChild(createPlayer2(player2));

const scorp = {
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["knife", "sword"],
  attack: function (name) {
    console.log(this.name + " Fight...");
  },
};
const sub = {
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["gun", "fireball"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

function createPlayer(player, name, hp) {
  const $player1 = document.createElement("div");
  const $progress = document.createElement("div");
  const $character = document.createElement("div");
  const $img = document.createElement("img");
  const $life = document.createElement("div");
  const $name = document.createElement("div");
  const $area = document.querySelector(".arenas");
  const playerHp = hp + "%";
  $player1.classList.add(player);
  $character.classList.add("character");
  $progress.classList.add("progressbar");
  $name.classList.add("name");
  $life.classList.add("life");

  switch (name) {
    case "Scorpion":
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif";
      break;
    case "Subzero":
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/subzero.gif";
      break;
    case "Kitana":
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/kitana.gif";
      break;
    case "Liukang":
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/liukang.gif";
      break;
    case "Sonya":
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/sonya.gif";
      break;
  }

  $area.appendChild($player1);
  $player1.appendChild($character);
  $player1.appendChild($progress);
  $progress.appendChild($life);
  $progress.appendChild($name);
  $character.appendChild($img);

  $life.style.width = playerHp;
  $name.innerText = name;
}

// createPlayer("player1", "Scorpion", 100);
// createPlayer("player2", "Liukang", 100);

function createPlayer2(player, obj) {
  const $player = document.createElement("div");
  const $progress = document.createElement("div");
  const $character = document.createElement("div");
  const $img = document.createElement("img");
  const $life = document.createElement("div");
  const $name = document.createElement("div");
  const $area = document.querySelector(".arenas");

  $player.classList.add(player);
  $character.classList.add("character");
  $progress.classList.add("progressbar");
  $name.classList.add("name");
  $life.classList.add("life");

  const playerHp = obj.hp + "%";

  $img.src = obj.img;

  $area.appendChild($player);
  $player.appendChild($character);
  $player.appendChild($progress);
  $progress.appendChild($life);
  $progress.appendChild($name);
  $character.appendChild($img);

  $life.style.width = playerHp;
  $name.innerText = obj.name;
}

createPlayer2("player1", scorp);
createPlayer2("player2", sub);

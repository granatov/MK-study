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

const $arenas = document.querySelector(".arenas");
const $randomBtn = document.querySelector(".button");

function createElement(tagName, className) {
  //создает элемент с классом (принимает имя тега и имя класса) - возвращает тег
  const $tag = document.createElement(tagName);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer2(obj) {
  // создает игрока с его свойствами
  const $player = createElement("div", "player" + obj.player); //создаем часть экрана, где будет расположен игрок и здоровье
  const $character = createElement("div", "character"); //создаем див, где будет картинка игрока
  const $img = createElement("img"); //создаем тег для изображения
  const $progress = createElement("div", "progressbar"); // создаем полоску здоровья (красная)
  const $life = createElement("div", "life"); //создаем заливку здоровья (синяя)
  const $name = createElement("div", "name"); //создаем стили и место для имени игрока в полоске здоровья (белое)

  const playerHp = obj.hp + "%"; //создаем переменную которая обращается к свойству обьекта ХП и добавляет ему %
  $img.src = obj.img; // создаем путь для картинки, ссылаясь на свойство обьекта игрока ИМГ - там ссылка на картинку
  $life.style.width = playerHp; //записываем что, полоска синяя здоровья берет ширину от количества ХП у обьекта игрока
  $name.innerText = obj.name; //имя игрока в полоске здоровья берется из обьекта игрока

  $player.appendChild($character); //место где будет стоять картинка игрока добавляем в область игрока (левая или правая)
  $character.appendChild($img); //добавляем в это место для картинки саму картинку
  $player.appendChild($progress); //место для полоски здоровья добавляем в область игрока
  $progress.appendChild($life); //в красную полоску добавляем синию полоску здоровья
  $progress.appendChild($name); //добавляем в эту полоску имя игрока

  return $player;
}

function getRandomInt(min, max) {
  // создает рандомное число и возвращает его
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function changeHp(player) {
  // меняет полоску здоровья принимая рандомное число
  const $playerLife = document.querySelector(
    //обращаемся к уже созданному элементу с классом плаер + добавляем к нему свойство обьекта где есть номер игрока и к его синей полоске здоровья
    ".player" + player.player + " .life"
  );

  player.hp -= getRandomInt(1, 20); // обращение к свойству обьекта ХР - и изменение его на принятое число от 0 до 20
  $playerLife.style.width = player.hp + "%"; //ширина синей полоски берется из количества ХП

  if (player.hp <= 0) {
    //условие, если ХП игрока становится 0 = то ширина полоски 0%
    player.hp = 0;
    $playerLife.style.width = 0 + "%";
  }
}

function playerWin(name) {
  //принимает значение имени + создает див куда поместить надпись + создает надпись и помещает в див
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " win";
    createReloadButton();
  } else {
    $winTitle.innerText = "drow";
    createReloadButton();
  }
  return $winTitle;
}

$randomBtn.addEventListener("click", function () {
  // событие на клик по кнопке РАНДОМ - вызывае  функцию измение ХП у переданного игрока
  changeHp(player1);
  changeHp(player2);

  if (player1.hp === 0 || player2.hp === 0) {
    // если ХП равно 0 у первого или второго игрока кнопка - отключается
    $randomBtn.disabled = true;
    $randomBtn.style.opacity = "0";
    $randomBtn.style.cursor = "default";
  }

  if (player1.hp <= 0 && player1.hp < player2.hp) {
    //если игрок1 имеет 0 ХП и его ХП меньше чем у игрока2
    $arenas.appendChild(playerWin(player2.name)); // то имя победителя обьявляется игрока2
  } else if (player2.hp <= 0 && player2.hp < player1.hp) {
    //если игрок2 имеет 0 ХП и его ХП меньше чем у игрока1
    $arenas.appendChild(playerWin(player1.name)); // то имя победителя обьявляется игрока1
  } else if (player1.hp == 0 && player2.hp == 0) {
    //если у обоих игроков ХП = 0 =
    $arenas.appendChild(playerWin()); //то вызывается функция без передачи параметра (ничья)
  }
});

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadBtn = createElement("button", "button");
  $reloadBtn.innerText = "Restart";
  $arenas.appendChild($reloadWrap);
  $reloadWrap.appendChild($reloadBtn);
  $reloadBtn.addEventListener("click", function () {
    window.location.reload();
  });
}

$arenas.appendChild(createPlayer2(player1));
$arenas.appendChild(createPlayer2(player2));

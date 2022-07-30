'use strict';

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['knife', 'sword'],
  changeHP,
  renderHP,
  elHp,
};
const player2 = {
  player: 2,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['gun', 'fireball'],
  changeHP,
  renderHP,
  elHp,
};
const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};
const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
  head: 40,
  body: 30,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

/**
 * отнимаем у обьекта ХП
 * @param {number} damage
 */
function changeHP(damage) {
  this.hp -= damage;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

/**
 *создает элемент с классом (принимает имя тега и имя класса) -
 * @param {string} tagName
 * @param {string} className
 * @returns {HTMLElement}
 */
function createElement(tagName, className) {
  //
  const $tag = document.createElement(tagName);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

/**
 *создает игрока с его свойствами
 * @param {object} obj
 * @returns {HTMLElement}
 */
function createPlayer2(obj) {
  //
  const $player = createElement('div', 'player' + obj.player); //создаем часть экрана, где будет расположен игрок и здоровье
  const $character = createElement('div', 'character'); //создаем див, где будет картинка игрока
  const $img = createElement('img'); //создаем тег для изображения
  const $progress = createElement('div', 'progressbar'); // создаем полоску здоровья (красная)
  const $life = createElement('div', 'life'); //создаем заливку здоровья (синяя)
  const $name = createElement('div', 'name'); //создаем стили и место для имени игрока в полоске здоровья (белое)

  const playerHp = obj.hp + '%'; //создаем переменную которая обращается к свойству обьекта ХП и добавляет ему %
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

/**
 * создает рандомное число и возвращает его
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(max) {
  let min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * отрисовывает полоску жизни у игрока
 */
function renderHP() {
  this.elHp().style.width = this.hp + '%';
}

/**
 * обращаемся к уже созданному элементу с классом плаер + добавляем к нему свойство обьекта где есть номер игрока и к его синей полоске здоровья
 * @returns {HTMLElement}
 */
function elHp() {
  return document.querySelector('.player' + this.player + ' .life');
}

/**
 *принимает значение имени + создает див куда поместить надпись + создает надпись и помещает в див
 * @param {string} name
 * @returns {string} winTitle
 */
function playerWin(name) {
  const $winTitle = createElement('div', 'loseTitle');
  if (name) {
    $winTitle.innerText = name + ' wins';
    createReloadButton();
  } else {
    $winTitle.innerText = 'drow';
    createReloadButton();
  }
  return $winTitle;
}

// $randomBtn.addEventListener("click", function () {
//   // событие на клик по кнопке РАНДОМ - вызывае  функцию измение ХП у переданного игрока
//   player1.changeHP(getRandomInt(20));
//   player2.changeHP(getRandomInt(20));
//   player1.renderHP();
//   player2.renderHP();

//   if (player1.hp === 0 || player2.hp === 0) {
//     // если ХП равно 0 у первого или второго игрока кнопка - отключается
//     $randomBtn.disabled = true;
//     $randomBtn.style.opacity = "0";
//     $randomBtn.style.cursor = "default";
//   }

//   if (player1.hp <= 0 && player1.hp < player2.hp) {
//     //если игрок1 имеет 0 ХП и его ХП меньше чем у игрока2
//     $arenas.appendChild(playerWin(player2.name)); // то имя победителя обьявляется игрока2
//   } else if (player2.hp <= 0 && player2.hp < player1.hp) {
//     //если игрок2 имеет 0 ХП и его ХП меньше чем у игрока1
//     $arenas.appendChild(playerWin(player1.name)); // то имя победителя обьявляется игрока1
//   } else if (player1.hp == 0 && player2.hp == 0) {
//     //если у обоих игроков ХП = 0 =
//     $arenas.appendChild(playerWin()); //то вызывается функция без передачи параметра (ничья)
//   }
// });

/**
 * создает кнопку сброса и создает событие клика на нее перезагружающая страницу
 */
function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadBtn = createElement('button', 'button');
  $reloadBtn.innerText = 'Restart';
  $arenas.appendChild($reloadWrap);
  $reloadWrap.appendChild($reloadBtn);
  $reloadBtn.addEventListener('click', function () {
    window.location.reload();
  });
}

/**
 * создает обьект с параметрами атаки врага
 * @returns {object}
 */
function enemyAttack() {
  const hit = ATTACK[getRandomInt(3)];
  const defence = ATTACK[getRandomInt(3)];
  return {
    value: getRandomInt(HIT[hit]),
    hit,
    defence,
  };
}

/**
 * создает обьект с параметрами атаки игрока1
 * @returns {object}
 */
function playerAttack() {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandomInt(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return attack;
}

/**
 * выводит на экнан результаты боя и деактивизирует кнопку fight
 */
function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    // если ХП равно 0 у первого или второго игрока кнопка - отключается
    $randomBtn.disabled = true;
    $randomBtn.style.opacity = '0';
    $randomBtn.style.cursor = 'default';
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
}

$formFight.addEventListener('submit', function (event) {
  event.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }
  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
  }

  showResult();
});

$arenas.appendChild(createPlayer2(player1));
$arenas.appendChild(createPlayer2(player2));

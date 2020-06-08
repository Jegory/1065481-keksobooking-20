"use strict";

var ALL = 8;
var PIN_X = 40;
var PIN_Y = 80;
var ADS = [];

var TIMES = ["12.00", "13.00", "14.00"];

var TYPES = ["palace", "flat", "house", "bungalo"];

var FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioners",
];

var TITLES = [
  "Топ недорогих отелей",
  "Топ популярных отелей",
  "В центре Токио",
  "На окраине Токио",
  "Хостел для студентов",
  "Для молодоженов",
  "Для семьи с детьми",
  "VIP-Бунгало",
  "Коттедж для компании",
  "Можно с животными",
];

var DESCRIPTIONS = [
  "Идеальный вариант в самом сердце Токио",
  "Тихие и комфортные аппартаменты в спальном районе Токио, пару остановок и вы в центре",
  "Светлая квартира с отличным видом на парк",
  "Бюджетный вариант для студентов с множеством развлечений для молодежи",
  "Уютные аппартаменты с интернетом и всеми удобствами",
  "Район с развитой инфраструктурой, парками и развлечениями, как для взрослых так и для детей",
  "VIP-resort на берегу Токийского залива с видовым бассейном и сауной",
  "Афрейм с панорамными окнами, большой терассой и зоной барбекю",
];

var PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];

// random из числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1));
};

// random из массива
var getRundomArray = function (array) {
  var newArray = Math.floor(Math.random() * array.length);
  return array[newArray];
};

var rentalAd = function () {
  var byX = getRandomNumber(300, 900);
  var byY = getRandomNumber(130, 630);

  var appartmentInfo = {
    author: {
      avatar: "img/avatars/user0" + (i + 1) + ".png",
    },
    offer: {
      title: getRundomArray(TITLES),
      address: byX + ", " + byY,
      price: getRandomNumber(1000, 10000),
      type: getRandomArray(TYPES),
      rooms: getRandomNumber(1, 20),
      guests: getRandomNumber(0, 100),
      checkin: getRandomArray(TIMES),
      checkout: getRandomArray(TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArray(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: byX,
      y: byY,
    },
  };
  return appartmentInfo;
};

// временно убираем класс у блока map
var map = document.querySelector(".map");
map.classList.remove("map--faded");

var pin = document.querySelector('.map__pins');

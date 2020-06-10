'use strict';

var TOTAL = 8;

var TIMES = ['12.00', '13.00', '14.00'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioners',
];

var TITLES = [
  'Топ недорогих отелей',
  'Топ популярных отелей',
  'В центре Токио',
  'На окраине Токио',
  'Хостел для студентов',
  'Для молодоженов',
  'Для семьи с детьми',
  'VIP-Бунгало',
  'Коттедж для компании',
  'Можно с животными',
];

var DESCRIPTIONS = [
  'Идеальный вариант в самом сердце Токио',
  'Тихие и комфортные аппартаменты в спальном районе Токио, пару остановок и вы в центре',
  'Светлая квартира с отличным видом на парк',
  'Бюджетный вариант для студентов с множеством развлечений для молодежи',
  'Уютные аппартаменты с интернетом и всеми удобствами',
  'Район с развитой инфраструктурой, парками и развлечениями, как для взрослых так и для детей',
  'VIP-resort на берегу Токийского залива с видовым бассейном и сауной',
  'Афрейм с панорамными окнами, большой терассой и зоной барбекю',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var map = document.querySelector('.map');
var pin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var filters = document.querySelector('.map__filters')
var minY = map.offsetHeight - filters.offsetHeight;
var title = document.querySelector('.map__title');
var maxY = map.offsetHeight - title.offsetHeight;

// random из числа
var getRandomNumber = function (max) {
  return Math.floor(Math.random() * (max - min + 1));
};

var getRental = function (count) {
  var appartments = [];

  for (var i = 0; i < count; i++) {
    appartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        address: byX + ', ' + byY,
        price: getRandomNumber(10000),
        type: TYPES[getRandomArray(TYPES.length)],
        rooms: getRandomNumber(20),
        guests: getRandomNumber(100),
        checkin: TIMES[getRandomArray(TIMES.length)],
        checkout: TIMES[getRandomArray(TIMES.length)],
        features: FEATURES[getRandomArray(FEATURES.length)],
        description: DESCRIPTIONS[getRandomArray(DESCRIPTIONS.length)],
        photos: PHOTOS[getRandomArray(PHOTOS.length)]
      },
      location: {
        x: getRandomNumber(map.offsetWidth);
        y: getRandomNumber(map.offsetHeight);
      }
    };
  }

  return appartments;
};

// временно убираем класс у блока map
var showMap = function () {
  map.classList.remove('map--faded');
};

showMap();


// + Вызов функции которая будет отбражатть карту
// функция которая будет генерировать рандомные данные аппартаментов
// функция которая будет создавать наполненный DOM-элемент данными
// функция будет делать рендер аппартаментов

/*

"location": {
  "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  "y": случайное число, координата y метки на карте от 130 до 630.
}

/*

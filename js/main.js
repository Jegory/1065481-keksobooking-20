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
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// ФУНКЦИЯ random из числа
var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1));
};

// ФУНКЦИЯ с объктками аппартаментов
var getRental = function (count) {
  var appartments = [];

  for (var i = 0; i < count; i++) {
    appartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        // address: byX + ', ' + byY,
        price: getRandomNumber(10000, 0),
        type: TYPES[getRandomNumber(TYPES.length)],
        rooms: getRandomNumber(20, 0),
        guests: getRandomNumber(100, 0),
        checkin: TIMES[getRandomNumber(TIMES.length)],
        checkout: TIMES[getRandomNumber(TIMES.length)],
        features: FEATURES[getRandomNumber(FEATURES.length)],
        description: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
        photos: PHOTOS[getRandomNumber(PHOTOS.length)]
      },
      location: {
        x: getRandomNumber(map.offsetWidth, 0),
        y: getRandomNumber(map.offsetHeight, 0)
      }
    };
  }

  return appartments;
};

// ФУНКЦИЯ временно убирает класс у блока map
var showMap = function () {
  map.classList.remove('map--faded');
};

// ФУНКЦИЯ которая создает разметку с рандомно сгенерированными данными, которую необходимо вставить в карту
var createAppartment = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {

    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + data[i].location.x + 'px;' + 'top: ' + data[i].location.y + 'px;';
    pinImage.src = data[i].author.avatar;
    pinImage.alt = data[i].offer.title;

    fragment.appendChild(pinElement);
  }

  return fragment;
};

// создали рандомный массив объектов и передали 8 эл
var appartments = getRental(TOTAL);
// console.log(appartments);

// наполняем наше дом дерево данными
var appartmentsElement = createAppartment(appartments);

// добавляем аппартаменты на карту
mapPins.appendChild(appartmentsElement);

showMap();

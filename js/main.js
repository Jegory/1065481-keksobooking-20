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

var RoomtType = {
  one: '1',
  two: '2',
  three: '3',
  hundret: '100'
};

var GuestType = {
  one: '1',
  two: '2',
  three: '3',
  notForGuest: '100'
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapEvent = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('fieldset');
var selects = document.querySelectorAll('select');
var inputs = document.querySelectorAll('input');
var forActive = false;

// form variables (validation)
var offerCapacity = form.querySelector('#capacity');
var offerRoomNumber = form.querySelector('#room_number');
var offerTitle = form.querySelector('#title');
var offerPrice = form.querySelectorAll('#price');

// x-y variables
var title = document.querySelector('.map__title');
var filters = document.querySelector('.map__filters-container');
var maxY = title.offsetHeight;
var minY = filters.offsetHeight;
// map.offsetHeight - (filters.offsetHeight + title.offsetHeight);

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
        y: getRandomNumber(maxY, minY)
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

var createFragmentPopup = function (appartment) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
  // cardElement.querySelector('.popup__text--adress').textContent = appartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = appartment.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ', выезд до ' + appartment.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = appartment.offer.description;
  cardElement.querySelector('.popup__avatar').src = appartment.author.avatar;

  return cardElement;
}


// создали рандомный массив объектов и передали 8 эл
var appartments = getRental(TOTAL);
console.log(appartments);

// наполняем наше дом дерево данными
var appartmentsElement = createAppartment(appartments);

// добавляем аппартаменты на карту
mapPins.appendChild(appartmentsElement);


var fragmentPopup = createFragmentPopup(appartments[0]);
map.appendChild(fragmentPopup);

showMap();


// // Module - 4 (total 4 parts)

// 4.1 page activation FUNCTION
// var activityPage = function (data) {
//   forActive = true;
//   map.classList.remove('map--faded');// active map
//   form.classList.remove('ad-form--disabled');// active form
//   createAppartment(data);// show all pins on the page
//   activityForm();
// };

// // 4.1 form activation FUNCTION (fieldset), (select), (input)
// var activityForm = function () {
//   Array.from(fieldsets).forEach(function (fieldset) {
//     fieldset.disabled = !forActive; // If page is not active, then fieldset off.
//   });
//   Array.from(selects).forEach(function (select) {
//     select.disabled = !forActive; // select off.
//   });
//   Array.from(inputs).forEach(function (input) {
//     input.disabled = !forActive; // input off.
//   });
// };

// // 4.2 page activation EVENT
// var activePage = function (data) {
//   mapEvent.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === 13) {
//       evt.preventDefault();
//       activityPage(data);
//     }
//   });

//   mapEvent.addEventListener('mousedown', function (evt) {
//     if (evt.which === 0) {
//       evt.preventDefault();
//       activityPage(data);
//     }
//   });
// };

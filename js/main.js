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

var MINY = 130;
var MAXY = 630;

var RoomType = {
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

var MouseDown = 0;
var EnterDown = 13;

// // form variables (validation)
// var formTitle = form.querySelector('#title');
// var formPrice = form.querySelectorAll('#price');

// FUNCTION random from the number
var getRandomNumber = function (max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

// ФУНКЦИЯ с объeктками аппартаментов
var getRental = function (count) {
  var apartments = [];

  for (var i = 0; i < count; i++) {
    var x = getRandomNumber(map.offsetWidth, 0);
    var y = getRandomNumber(MAXY, MINY);
    apartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        address: x + ', ' + y,
        price: getRandomNumber(10000, 0),
        type: TYPES[getRandomNumber(TYPES.length)],
        rooms: getRandomNumber(20, 0),
        guests: getRandomNumber(100, 0),
        checkin: TIMES[getRandomNumber(TIMES.length)],
        checkout: TIMES[getRandomNumber(TIMES.length)],
        features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
        description: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
        photos: PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length + 1))
      },
      location: {
        x: x,
        y: y
      }
    };
  }
  return apartments;
};

// ФУНКЦИЯ временно убирает класс у блока map
var showMap = function () {
  map.classList.remove('map--faded');
};

// ФУНКЦИЯ которая создает разметку с рандомно сгенерированными данными, которую необходимо вставить в карту
var createApartment = function (data) {
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

// FUNCTION Add random FEATURES
var addFeatures = function (data, cardElement) {
  var features = cardElement.querySelector('.popup__features');
  var childFeatures = features.querySelector('.popup__feature');

  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }

  data.forEach(function (item) {
    var cloneChild = childFeatures.cloneNode(true);
    var className = 'popup__feature--' + item;

    cloneChild.classList.remove('popup__feature--wifi');
    cloneChild.classList.add(className);
    features.appendChild(cloneChild);
  });
};

// FUNCTION Clone PHOTO in container

// FUNCTION Check container - if no photo, - delete container popup__photos
var addPhotos = function (images, element) {
  var photosItem = element.querySelector('.popup__photos');
  var firstPhoto = photosItem.querySelector('.popup__photo');

  while (photosItem.firstChild) {
    photosItem.removeChild(photosItem.firstChild);
  }

  images.forEach(function (item) {
    var clonePhoto = firstPhoto.cloneNode(true);
    clonePhoto.src = item;

    photosItem.appendChild(clonePhoto);
  });
};

// Отрисовывает эл на странице, вставляем в DOM дерево
var createFragmentPopup = function (apartment) {
  var cardElement = cardTemplate.cloneNode(true);


  cardElement.querySelector('.popup__title').textContent = apartment.offer.title;

  cardElement.querySelector('.popup__text--address').textContent = apartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = apartment.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = apartment.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
  cardElement.querySelector('.popup__avatar').src = apartment.author.avatar;
  addFeatures(apartment.offer.features, cardElement);
  cardElement.querySelector('.popup__photos').src = apartment.offer.photos;
  addPhotos(apartment.offer.photos, cardElement);

  return cardElement;
};

// var fragmentPopup = createFragmentPopup(apartments[0]);
// map.appendChild(fragmentPopup);


// Module - 4 (total 3 parts)

// 4.1 page activation FUNCTION
var activityPage = function (data) {

  var apartments = getRental(TOTAL); // создали рандомный массив объектов и передали 8 эл

  var apartmentsElement = createApartment(apartments); // наполняем наше дом дерево данными

  mapPins.appendChild(apartmentsElement); // добавляем аппартаменты на карту

  activityForm();
  showMap();
};

// 4.1 form activation FUNCTION (fieldset), (select), (input)
var activityForm = function () {
  forActive = true;
  form.classList.remove('ad-form--disabled');// active form
  Array.from(fieldsets).forEach(function (fieldset) {
    fieldset.disabled = !forActive; // If page is not active, then fieldset off.
  });
  Array.from(selects).forEach(function (select) {
    select.disabled = !forActive; // select off.
  });
  Array.from(inputs).forEach(function (input) {
    input.disabled = !forActive; // input off.
  });
};

// function clickKeyEvent(evt) {
//   return evt.keyCode === EnterDown;
// };

// function clickMouseEvent(evt) {
//   return evt.which === MouseDown;
// };

// function startApp(evtClose) {
//   if (clickKeyEvent(evtClose) || clickMouseEvent(evtClose)) {
//     evtClose.preventDefault();
//     activityPage(evtClose);
//   };
// };

// 4.2 page activation EVENT
var startApp = function (data) {
  mapEvent.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      activityPage(data);
    }
    mapEvent.removeEventListener('keydown', startApp); // Delete evt???
  });

  mapEvent.addEventListener('mousedown', function (evt) {
    if (evt.which === 0) {
      evt.preventDefault();
      activityPage(data);
    }
  });
  mapEvent.removeEventListener('mousedown', startApp); // Delete evt???
};

//  4.3 page FUNCTION - room and guest form validation
var validCapasityVsRoom = function () {

  var formCapacity = document.querySelector('#capacity');
  var formRoomNumber = document.querySelector('#room_number');

  // var message = '';

  if (formRoomNumber.value === RoomType.one) { // 1 room not 1 guest
    if (formCapacity.value !== GuestType.one) { // check first if
      // message = 'Нужно выбрать не больше одного гостя';
      formCapacity.setCustomValidity('Нужно выбрать не больше одного гостя');
    }
  } else if (formRoomNumber.value === RoomType.two) { // if selected 2 rooms
    if (formCapacity.value !== GuestType.two) {
      // message = 'Нужно выбрать одного или двух гостей';
      formCapacity.setCustomValidity('Нужно выбрать одного или двух гостей');
    }
  } else if (formRoomNumber.value === RoomType.three) { // if selected 3 rooms
    if (formCapacity.value !== GuestType.three) {
      // message = 'Нужно выбрать от одного до трех гостей';
      formCapacity.setCustomValidity('Нужно выбрать от одного до трех гостей');
    }
  } else if (formRoomNumber.value === RoomType.handret) { // selected 100 rooms
    if (formCapacity.value !== GuestType.notForGuest) {
      // message = 'Не для гостей';
      formCapacity.setCustomValidity('Не для гостей');
    } else {
      formCapacity.setCustomValidity(''); // if form valid - no error message
    }
  }
  // formCapacity.value.setCustomValidity(message);
};

activityPage();
// startApp();

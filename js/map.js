'use strict';

var APPARTMENTS_QUANTITY = 8; //  количество объявлений
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
var APPARTMENT_TYPES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [];
var photosQuantity = 3;
var minCoordinateX = 1;
var maxCoordinateX = 1200;
var minCoordinateY = 130;
var maxCoordinateY = 630;
var minPrice = 1000;
var maxPrice = 1000000;
var ENTER = 13;
var ESC = 27;

//  генерирую массив с изображений помещений
var createPhotos = function (imageQuantity) {
  for (var i = 0; i < imageQuantity; i++) {
    var image = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    PHOTOS.push(image);
  }
};
createPhotos(photosQuantity);

/**
 * поиск случайного числа в пределах min и max
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

//  создаю массив из 8 объектов (описание жилых помещений)
var appartments = [];

/**
 * рендер жилых помещений
 * @param  {number} appartmentsQuantity
 * @return {array} appartments
 */
var createAppartments = function (appartmentsQuantity) {
  for (var i = 0; i < appartmentsQuantity; i++) {
    var location = {
      'x': getRandomInteger(minCoordinateX, maxCoordinateX),
      'y': getRandomInteger(minCoordinateY, maxCoordinateY)
    };
    var appartment = {
      'author': 'img/avatars/user0' + (i + 1) + '.png',
      'offer': {
        'title': TITLES[i],
        'address': location.x + ', ' + location.y,
        'price': getRandomInteger(minPrice, maxPrice),
        'type': OFFER_TYPES[getRandomInteger(0, 3)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 5), //  случайное кол-во гостей для размещения взял самостоятельно от 1 до 5
        'checkin': CHECK_TIMES[getRandomInteger(0, 2)],
        'checkout': CHECK_TIMES[getRandomInteger(0, 2)],
        'features': FEATURES_TYPES.slice(getRandomInteger(0, 2), getRandomInteger(3, 5)),
        'description': ' ',
        'photos': PHOTOS
      },
      'location': {
        'x': location.x,
        'y': location.y
      }
    };
    appartments.push(appartment);
  }
};
createAppartments(APPARTMENTS_QUANTITY);

//  создание меток объявлений
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * рендер меток
 * @param  {Object} appartments[i]
 * @param  {index} i
 * @return {Object}
 */
var renderPin = function (appartment, index) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.querySelector('img').src = appartment.author;
  pinElement.querySelector('img').alt = appartment.offer.title;
  pinElement.setAttribute('data-id', index);

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i], i));
}

//  создание карточки объявления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

/**
 * генерация карточки объявления
 * @param {Object} appartment
 * @return {HTMLDomNode}
 */
var renderCard = function (appartment) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = appartment.author;
  cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = APPARTMENT_TYPES[appartment.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + appartment.offer.checkout;

  cardElement.querySelector('.popup__features').innerHTML = '';
  for (var j = 0; j < appartment.offer.features.length; j++) {
    var elementLi = document.createElement('li');
    elementLi.className = 'popup__feature popup__feature--' + appartment.offer.features[j];
    cardElement.querySelector('.popup__features').appendChild(elementLi);
  }

  cardElement.querySelector('.popup__description').textContent = appartment.offer.description;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  for (var i = 0; i < PHOTOS.length; i++) {
    var elementImg = document.createElement('img');
    elementImg.className = 'popup__photo';
    elementImg.src = appartment.offer.photos[i];
    elementImg.width = 45;
    elementImg.height = 40;
    cardElement.querySelector('.popup__photos').appendChild(elementImg);
    cardElement.querySelector('.popup__photos').querySelector('img').src = appartment.offer.photos[i];
  }

  return cardElement;
};

var filter = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');

//  активация страницы, отключаю все элементы ввода формы
var formElements = document.querySelectorAll('fieldset');

for (var j = 0; j < formElements.length; j++) {
  formElements[j].disabled = true;
}

//  перевожу карту в активное состояния
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');

/**
 * активация карты на нажатие на главную метку
 */
 var mapStart = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  similarListElement.appendChild(fragment);

  addPinsClickHandler();
};

/**
 * заполнение координат метки в поле формы
 * @param {number} left, top
 * @return {numbers}
 */
var fillAdress = function (left, top) {
  var inputAdress = document.querySelector('#address');
  inputAdress.value = left + ', ' + top;
};

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    mapStart();
  }
});

/**
 * скрытие карточки объявления
 */
var deleteOpenedCard = function() {
  var mapCard = document.querySelector('.map__card');
  map.removeChild(mapCard);
};

/**
 * рендер карточек обяъвлений при нажатии на метки
 * @param  {number} pinId
 * @return {Object} newCard
 */
var doCardJob = function(pinId) {
  //  проверка наличия карточки
  var elementAvailable = document.querySelector('.map__card');
  if (elementAvailable) {
    deleteOpenedCard();
  }

  var newCard = renderCard(appartments[pinId]);
  map.insertBefore(newCard, filter);
}

/**
 * рендер карточек объявлений при нажатии на метки
 */
var addPinsClickHandler = function() {
  var pinsList = similarListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', function(evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      doCardJob(pinId);

      var popupCloseButton = document.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', function () {
        deleteOpenedCard();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC) {
          deleteOpenedCard();
        }
      });
    });
  }
};

//  работа с полями 'кол-во комнат' и 'кол-во мест'
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var roomNumberOptions = roomNumberSelect.querySelectorAll('option');
var capacityOptions = capacitySelect.querySelectorAll('option');
/**
 * очистка полей
 */
var clearOptions = function() {
  for (var i = 0; i < roomNumberOptions.length; i++) {
    roomNumberOptions[i].removeAttribute('selected');
    roomNumberOptions[i].removeAttribute('disabled');
    capacityOptions[i].removeAttribute('selected');
    capacityOptions[i].removeAttribute('disabled');
  }
};

/**
 * синхронизация кол-ва комнат с кол-вом гостей
 */
var roomNumberHandler = function(evt) {
  clearOptions();
  var current = evt.currentTarget.selectedIndex;
  if (current === 0) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].selected = true;
    capacityOptions[3].disabled = true;
  } else if (current === 1) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].selected = true;
    capacityOptions[2].selected = true;
    capacityOptions[3].disabled = true;
  } else if (current === 2) {
    capacityOptions[0].selected = true;
    capacityOptions[1].selected = true;
    capacityOptions[2].selected = true;
    capacityOptions[3].disabled = true;
  } else if (current === 3) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = true;
    capacityOptions[3].selected = true;
  }
};

/**
 * синхронизация кол-ва комнат с кол-вом гостей
 */
var capacityHandler = function(evt) {
  clearOptions();
  var current = evt.currentTarget.selectedIndex;
  if (current === 0) {
    roomNumberOptions[2].selected = true;
  } else if (current === 1) {
    roomNumberOptions[1].selected = true;
  } else if (current === 2) {
    roomNumberOptions[0].selected = true;
  } else if (current === 3) {
    roomNumberOptions[3].selected = true;
  }
};

roomNumberSelect.addEventListener('change', roomNumberHandler);
capacitySelect.addEventListener('change', capacityHandler);

//  работа с полями 'тип жилья' и 'цена за ночь'
var typeOfRoomsSelect = document.querySelector('#type');
var priceOfRoomsSelect = document.querySelector('#price');
/**
 * устанавливаю мин стоимость жилья в зависимости от типа
 */
var typeSelectHandler = function(evt) {
  var current = evt.currentTarget.selectedIndex;

  if (current === 0) {
    priceOfRoomsSelect.setAttribute('min', 0);
    priceOfRoomsSelect.setAttribute('placeholder', 0);
  } else if (current === 1) {
    priceOfRoomsSelect.setAttribute('min', 1000);
    priceOfRoomsSelect.setAttribute('placeholder', 1000);
  } else if (current === 2) {
    priceOfRoomsSelect.setAttribute('min', 5000);
    priceOfRoomsSelect.setAttribute('placeholder', 5000);
  } else if (current === 3) {
    priceOfRoomsSelect.setAttribute('min', 10000);
    priceOfRoomsSelect.setAttribute('placeholder', 10000);
  }
};

typeOfRoomsSelect.addEventListener('change', typeSelectHandler);

//  работа с полями времени заезда/выезда
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');
var timeInSelectOptions = timeInSelect.querySelectorAll('option');
var timeOutSelectOptions = timeOutSelect.querySelectorAll('option');

/**
 * синхронизация полей времени заезда/выезда
 */
var selectHandler = function(evt, timeOutSelectOptions) {
  for (var i = 0; i < timeInSelectOptions.length; i++) {
    if(timeInSelectOptions[i].select) {
      timeInSelectOptions[i].removeAttribute('selected');
    }
  }

  for (var i = 0; i < timeOutSelectOptions.length; i++) {
    if(timeOutSelectOptions[i].select) {
      timeOutSelectOptions[i].removeAttribute('selected');
    }
  }

  var current = evt.currentTarget.selectedIndex;
  timeOutSelectOptions[current].selected = true;
};

timeInSelect.addEventListener('change', function(evt) {
  selectHandler(evt, timeOutSelectOptions);
});

timeOutSelect.addEventListener('change', function(evt) {
  selectHandler(evt, timeInSelectOptions);
});


document.addEventListener('click', function(evt) {
  console.log(evt);
});
//  -----------------------------DRAG-N-DROP-----------------------
var pinHandler = document.querySelector('.map__pin--main');

pinHandler.addEventListener('mousedown', function (evt) {
 evt.preventDefault();

 var startCoords = {
   x: evt.clientX,
   y: evt.clientY
 };
  console.log(startCoords);

 var onMouseMove = function (moveEvt) {
   moveEvt.preventDefault();

   var shift = {
     x: startCoords.x - moveEvt.clientX,
     y: startCoords.y - moveEvt.clientY
   };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

   fillAdress(startCoords.x, startCoords.y);

   var mainPinHalf = 32;
   var bodyRect = document.body.getBoundingClientRect();
   var mapp = document.querySelector('.map__overlay');
   var elemRect = mapp.getBoundingClientRect();
   var offsetLeft   = elemRect.left - bodyRect.left;
   var offsetTop   = elemRect.top - bodyRect.top;
   var offsetRight   = elemRect.right - bodyRect.left;
   var offsetBottom   = elemRect.bottom - bodyRect.top;

   if (moveEvt.pageX < 200) {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (offsetLeft - mainPinHalf) + 'px';
   } else if (moveEvt.pageY < 15) {
      pinHandler.style.top = (offsetTop) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   } else if (moveEvt.pageX > 1390) {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (offsetRight - mainPinHalf) + 'px';
   } else if (moveEvt.pageY > 700) {
      pinHandler.style.top = (offsetBottom - mainPinHalf) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   } else {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   }
 };

 var onMouseUp = function (upEvt) {
   upEvt.preventDefault();

   document.removeEventListener('mousemove', onMouseMove);
   document.removeEventListener('mouseup', onMouseUp);

   mapStart();
 };

 document.addEventListener('mousemove', onMouseMove);
 document.addEventListener('mouseup', onMouseUp);
});

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

//  создаю функцию, генерирующую массив с изображений помещений
var createPhotos = function (imageQuantity) {
  for (var i = 0; i < imageQuantity; i++) {
    var image = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    PHOTOS.push(image);
  }
};
createPhotos(photosQuantity);

//  создаю функцию для поиска случайного числа в пределах max,min значений
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

//  создаю массив из 8 объектов (описание жилых помещений)
var appartments = [];

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

//  Создаю метки объявлений
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

//  Создаю карточку объявления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

/**
 * Генерация карточки объявления
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

//  Активация страницы, отключаю все элементы ввода формы
var formElements = document.querySelectorAll('fieldset');

for (var j = 0; j < formElements.length; j++) {
  formElements[j].disabled = true;
}

//  у блока .map убираю класс .map--faded при нажатии на главную метку
//  перевожу карту в активное состояния
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');

/**
 * Активация карты на нажатие на главную метку
 */
 var mapStart = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  similarListElement.appendChild(fragment);

  var inputAdress = document.querySelector('#address');
  inputAdress.value = mainPin.style.left.slice(0, 3) + ', ' + mainPin.style.top.slice(0, 3);

  addPinsClickHandler();
};

mainPin.addEventListener('mouseup', function () {
  mapStart();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    mapStart();
  }
});

//  Задание 3. Просмотр подробной информации о похожих объявлениях
var pins = fragment.querySelectorAll('.map__pin');

var deleteOpenedCard = function() {
  var mapCard = document.querySelector('.map__card');
  map.removeChild(mapCard);
};

var doCardJob = function(pinId) {
  //  проверка наличия карточки
  var elementAvailable = document.querySelector('.map__card');
  if (elementAvailable) {
    deleteOpenedCard();
  }

  var newCard = renderCard(appartments[pinId]);
  map.insertBefore(newCard, filter);
}

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
        if (evt.keyCode === 27) {
          deleteOpenedCard();
        }
      });
    });
  }
};















var selectOfRooms = document.querySelector('#room_number');
var selectOfCapacities = document.querySelector('#capacity');
var selectOfCapacitiesCollection = selectOfCapacities.querySelectorAll('option');
console.log(selectOfCapacitiesCollection);

//function resultOptionFirst() {
//  selectOfCapacities.innerHTML = '<option value="3" disabled>для 3 гостей</option><option value="2" disabled>для 2 гостей</option><option value="2" selected>для 1 гостя</option><option value="3" disabled>не для гостей</option>';
//}
//
//function resultOptionSecond() {
//  selectOfCapacities.innerHTML = '<option value="3" disabled>для 3 гостей</option><option value="2" selected>для 2 гостей</option><option value="2">для 1 гостя</option><option value="3" disabled>не для гостей</option>';
//}
//
//function resultOptionThird() {
//  selectOfCapacities.innerHTML = '<option value="3" selected>для 3 гостей</option><option value="2">для 2 гостей</option><option value="2">для 1 гостя</option><option value="3" disabled>не для гостей</option>';
//}
//
//function resultOptionFourth() {
//  selectOfCapacities.innerHTML = '<option value="3" disabled>для 3 гостей</option><option value="2" disabled>для 2 гостей</option><option value="2" disabled>для 1 гостя</option><option value="3" selected>не для гостей</option>';
//}
//
//selectOfRooms.addEventListener('change', function (evt) {
//  console.log('Event', evt);
//  var options = selectOfRooms.querySelectorAll("option");
//  if (selectOfRooms.value == "1") {
//    resultOptionFirst();
//  } else if (selectOfRooms.value == "2") {
//      resultOptionSecond();
//    } else if (selectOfRooms.value == "3") {
//        resultOptionThird();
//      } else if (selectOfRooms.value == "100") {
//          resultOptionFourth();
//        }
//});

selectOfRooms.addEventListener('change', function (evt) {
  console.log('Event', evt);
  var options = selectOfRooms.querySelectorAll("option");
  if (selectOfRooms.value == "2") {
    selectOfCapacitiesCollection[1].removeAttribute('disabled');
  } else if (selectOfRooms.value == "3") {
      selectOfCapacitiesCollection[0].removeAttribute('disabled');
    } else if (selectOfRooms.value == "100") {
        selectOfCapacitiesCollection[0].setAttribute('disabled', true);
        selectOfCapacitiesCollection[1].setAttribute('disabled', true);
        selectOfCapacitiesCollection[2].setAttribute('disabled', true);
        selectOfCapacitiesCollection[3].removeAttribute('disabled');
      }
});


//  с таким вариантом, думается лучше удалить из разметки disabled
//  и вставлять через управление DOM'ом
//  selectOfcapacities.setAttribute('disabled');





//  ещё вариант с нахождением клика на текущем элементе = currentTarget (либо evt.target)
//selectOfRooms.addEventListener('change', function (evt) {
//  console.log('Event', evt);
//  var options = selectOfRooms.querySelectorAll("option");
//  if (evt.currentTarget.value == "2") {
//    selectOfCapacitiesCollection[1].removeAttribute('disabled');
//  } else if (evt.currentTarget.value == "3") {
//      selectOfCapacitiesCollection[0].removeAttribute('disabled');
//    } else if (evt.currentTarget.value == "100") {
//        selectOfCapacitiesCollection[0].setAttribute('disabled');
//        selectOfCapacitiesCollection[1].setAttribute('disabled');
//        selectOfCapacitiesCollection[2].setAttribute('disabled');
//        selectOfCapacitiesCollection[3].removeAttribute('disabled');
//      }
//});
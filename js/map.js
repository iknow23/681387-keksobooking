'use strict';

//  константы
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
        'features': FEATURES_TYPES.slice(getRandomInteger(0, 5), getRandomInteger(0, 5)),
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

//  создаю массив объектов с жильём
createAppartments(APPARTMENTS_QUANTITY);

//  Создаю метки объявлений
//  нахожу место в разметке, куда буду вставлять похожие друг на друга метки на карте
var similarListElement = document.querySelector('.map__pins');
//  нахожу шаблон, по которому буду создавать метку
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

//  пишу функцию для генерирования метки в соответствии с шаблоном
var renderPin = function (appartment) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.querySelector('img').src = appartment.author;
  pinElement.querySelector('img').alt = appartment.offer.title;

  return pinElement;
};

// создаю набор меток по шаблону
var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i]));
}

//  вставляю набор меток в разметку, в блок с классом '.map__pins'
//  код вставки на строке 177

//  Создаю карточку объявления
//  нахожу шаблон, по которому буду создавать карточку обяъвления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

//  пишу функцию для генерирования карточки объявления в соответствии с шаблоном
var renderCard = function (appartment) {
  var cardElement = similarCardTemplate.cloneNode(true);

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

//  создаю 1 карточку объявления по шаблону
var promoCard = renderCard(appartments[0]);

//  нахожу блок фильтра, перед которым буду вставлять объявление
var filter = document.querySelector('.map__filters-container');

//  вставляю объявление в разметку, в блок с классом '.map'
//  код вставки на строке 190
var map = document.querySelector('.map');

//  -------------------------------------------------------------------------------------------------
//  Задание 1. Активация страницы
//  отключаю все элементы ввода формы
var formElements = document.querySelectorAll('fieldset');

for (var j = 0; j < formElements.length; j++) {
  formElements[j].disabled = true;
}

//  у блока .map убираю класс .map--faded при нажатии на главную метку
//  перевожу карту в активное состояния
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');

mainPin.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  similarListElement.appendChild(fragment);
});

//  Задание 2. Заполнение поля адреса
//  нахожу поле ввода
var inputAdress = document.querySelector('#address');
//  заполняю через DOM значение value у input
inputAdress.value = mainPin.style.left + ' ' + mainPin.style.top;

//  Задание 3. Просмотр подробной информации о похожих объявлениях
//  нахожу метки, по которым буду отлавливать нажатия для того, чтобы выводить карточку объявления
var pins = fragment.querySelectorAll('.map__pin');
//  promoCard - карта в 1 экземпляре, которая отображается для всех меток

var addPinsClickHandler = function (pin, card) {
  pin.addEventListener('click', function () {
    map.insertBefore(promoCard, filter);

    //  Теперь, при открывшейся карточке объявления (внутри данного обработчика) буду скрывать эту самую карточку
    //  Закрываю карточку с объявлением
    var mapCard = document.querySelector('.map__card');
    var popupCloseButton = document.querySelector('.popup__close');
    //  пишу функцию открытия/закрытия карточки объвления
    var popupClose = function () {
      mapCard.style.display = 'none';
    };
    //  применяю функцию закрытия к обработчикам событий
    popupCloseButton.addEventListener('click', function () {
      popupClose();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        popupClose();
      }
    });

  });
};

for (var i = 0; i < pins.length; i++) {
  addPinsClickHandler(pins[i], promoCard);
}

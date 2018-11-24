'use strict';

//  константы
var AVATARS = [];
var avatarsQuantity = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [];
var photosQuantity = 3;
var APPARTMENTS_QUANTITY = 8;

//  создаю функцию, генерирующую массив с адресами изображений
var createImages = function(imageQuantity) {
  for (var i = 1; i <= imageQuantity; i++) {
    var image_i = 'img/avatars/' + 'user0' + i + '.png';
    AVATARS.push(image_i);
  }
};
createImages(avatarsQuantity);

//  создаю функцию, генерирующую массив с изображений помещений
var createPhotos = function(imageQuantity) {
  for (var i = 1; i <= imageQuantity; i++) {
    var image_i = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
    PHOTOS.push(image_i);
  }
};
createPhotos(photosQuantity);

//  создаю функцию для поиска случайного числа в пределах max,min значений
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

//  создаю функцию для перемешивания массива в случайном порядке
function compareRandom(a, b) {
  return Math.random() - 0.5;
}

//  создаю массив из 8 объектов (описание жилых помещений)
var appartments = [];

var createAppartments = function (appartmentsQuantity) {
  for (var i = 0; i <= 7; i++) {
    var appartment = {
      'author': AVATARS[i],
      'offer': {
        'title': TITLES[i],
        'address': getRandomInteger(1, 1000) + ' ' + getRandomInteger(130, 630),
        'price': getRandomInteger(1000, 1000000),
        'type': APPARTMENT_TYPES[getRandomInteger(0, 3)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 5), //  случайное кол-во гостей для размещения взял самостоятельно от 1 до 5
        'checkin': CHECK_TIMES[getRandomInteger(0, 2)],
        'checkout': CHECK_TIMES[getRandomInteger(0, 2)],
        'features': FEATURES_TYPES.length=getRandomInteger(1, 6),
        'description': ' ',
        'photos': PHOTOS.sort(compareRandom)
      },
      'location': {
        'x': getRandomInteger(1, 1200),
        'y': getRandomInteger(130, 630)
      }
    };
    appartments.push(appartment);
  }
};
//создаю массив объектов с жильём
createAppartments(APPARTMENTS_QUANTITY);

//  у блока .map убираю класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');





//-----------------------------------Задание №3----------------------------------------------------

//  3. Создаю метки
//  нахожу место в разметке, куда буду вставлять похожие друг на друга метки на карте
var similarListElement = document.querySelector('.map__pins');
//  нахожу шаблон, по которому буду создавать метку
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

//  пишу функцию для генерирования метки в соответствии с шаблоном
var renderPin = function (appartment) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.children[0].src = appartment.author;
  pinElement.children[0].alt = appartment.offer.title;

  return pinElement;
};

// создаю набор меток по шаблону
var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i]));
}

//  вставляю набор меток в разметку, в блок с классом '.map__pins'
similarListElement.appendChild(fragment);



//-----------------------------------Задание №5----------------------------------------------------

//  5. Создаю карточки объявлений
//  нахожу шаблон, по которому буду создавать карточку обяъвления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

//  пишу функцию для генерирования карточки объявления в соответствии с шаблоном
var renderCard = function (appartment) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = appartment.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.quests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + 'appartment.offer.checkout';
  cardElement.querySelector('.popup__features').textContent = appartment.offer.features;
  cardElement.querySelector('.popup__description').textContent = appartment.offer.description;
  // cardElement.querySelector('.popup__photos').textContent = appartment.offer.description;

  return renderCard;
};

// создаю 1 объявление по шаблону
var promoCard = renderCard(appartments[0]);

//  нахожу блок, в который буду вставлять обяъвление
var map = document.querySelector('.map');

//  нахожу блок фильтра, перед которым буду вставлять объявление
var filter = document.querySelector('.map__filters-container');

//  вставляю объявление в разметку, в блок с классом '.map'
map.insertBefore(promoCard, filter);

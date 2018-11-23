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

console.log(appartments);

//  у блока .map убираю класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');





//-----------------------------------Задание №3----------------------------------------------------

//  3.1 Рисую метку
//  нахожу место в разметке, куда буду вставлять похожие друг на друга метки на карте
var similarListElement = document.querySelector('.map__pins');
//  нахожу шаблон, по которому буду создавать метку
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

//  вставляю метку в соответствии с шаблоном
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = 'left: appartments[i].location[0] + 'px'; top: appartments[i].location[1] + 'px';'
  pinElement.src = appartments[i].author;
  pinElement.alt = appartments[i].offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i]));
}
similarListElement.appendChild(fragment);

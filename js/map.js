'use strict';
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//  создаю функцию для поиска случайного числа в пределах max,min значений
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

//создаю массив из 8 объектов (описание жилых помещений)
var appartments = [];

for (var i = 0; i <= 7; i++) {
  var appartment = {
    'author': AVATARS[i],
    'offer': {
      'title': TITLES[i],
      'address': getRandomInteger(1, 1000) + ' ' + getRandomInteger(1, 1000),
      'price': getRandomInteger(1000, 1000000),
      'type': APPARTMENT_TYPES[getRandomInteger(0, 3)],
      'rooms': getRandomInteger(1, 5),
      'guests': getRandomInteger(1, 5), //случайное кол-во гостей для размещения взял самостоятельно от 1 до 5
      'checkin': CHECK_TIMES[getRandomInteger(0, 2)],
      'checkout': CHECK_TIMES[getRandomInteger(0, 2)],
      'features': FEATURES_TYPES.length=getRandomInteger(1, 6),
      'description': ' ',
      // 'photos': массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
    },
    // 'location': {
    //   «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    //   «y»: случайное число, координата y метки на карте от 130 до 630.
    // }
  };
  appartments.push(appartment);
};

console.log(appartments);

//у блока .map убираю класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

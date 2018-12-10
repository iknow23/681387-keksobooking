(function () {
  'use strict';
  
  var appartments = [];

  window.data = {
    appartments: appartments
  };

//  var APPARTMENTS_QUANTITY = 8; //  количество объявлений
//  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
//  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
//  var APPARTMENT_TYPES = {
//    flat: 'Квартира',
//    bungalo: 'Бунгало',
//    house: 'Дом',
//    palace: 'Дворец'
//  };
//  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
//  var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//  var PHOTOS = [];
//  var photosQuantity = 3;
//  var minCoordinateX = 1;
//  var maxCoordinateX = 1200;
//  var minCoordinateY = 130;
//  var maxCoordinateY = 630;
//  var minPrice = 1000;
//  var maxPrice = 1000000;

  //  генерирую массив с изображений помещений
//  var createPhotos = function (imageQuantity) {
//    for (var i = 0; i < imageQuantity; i++) {
//      var image = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
//      PHOTOS.push(image);
//    }
//  };
//  createPhotos(photosQuantity);

  /**
   * поиск случайного числа в пределах min и max
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
//  function getRandomInteger(min, max) {
//    var rand = min - 0.5 + Math.random() * (max - min + 1);
//    rand = Math.round(rand);
//    return rand;
//  }

//  /**
//   * рендер жилых помещений
//   * @param  {number} appartmentsQuantity
//   * @return {array} appartments
//   */
//  var createAppartments = function (appartmentsQuantity) {
//    for (var i = 0; i < appartmentsQuantity; i++) {
//      var location = {
//        'x': getRandomInteger(minCoordinateX, maxCoordinateX),
//        'y': getRandomInteger(minCoordinateY, maxCoordinateY)
//      };
//      var appartment = {
//        'author': 'img/avatars/user0' + (i + 1) + '.png',
//        'offer': {
//          'title': TITLES[i],
//          'address': location.x + ', ' + location.y,
//          'price': getRandomInteger(minPrice, maxPrice),
//          'type': OFFER_TYPES[getRandomInteger(0, 3)],
//          'rooms': getRandomInteger(1, 5),
//          'guests': getRandomInteger(1, 5), //  случайное кол-во гостей для размещения взял самостоятельно от 1 до 5
//          'checkin': CHECK_TIMES[getRandomInteger(0, 2)],
//          'checkout': CHECK_TIMES[getRandomInteger(0, 2)],
//          'features': FEATURES_TYPES.slice(getRandomInteger(0, 2), getRandomInteger(3, 5)),
//          'description': ' ',
//          'photos': PHOTOS
//        },
//        'location': {
//          'x': location.x,
//          'y': location.y
//        }
//      };
//      appartments.push(appartment);
//    }
//  };
//  createAppartments(APPARTMENTS_QUANTITY);

})();

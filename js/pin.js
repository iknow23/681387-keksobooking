(function () {
  'use strict';

  //  создание меток объявлений
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
    pinElement.querySelector('img').src = appartment.author.avatar;
    pinElement.querySelector('img').alt = appartment.offer.title;
    pinElement.setAttribute('data-id', index);

    return pinElement;
  };

  window.pin = renderPin;

})();

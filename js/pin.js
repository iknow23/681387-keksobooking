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

  var render = function() {
    var appartments = window.data.appartments;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < appartments.length; i++) {
      fragment.appendChild(renderPin(appartments[i], i));
    }
    window.map.similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: render
  };


})();

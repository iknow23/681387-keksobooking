'use strict';
(function () {

  //  создание меток объявлений
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var deletePins = function () {
    //  скрытие меток объявлений
    var deleted = function () {
      var pinsMap = document.querySelector('.map__pins');
      var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsList.length; i++) {
        pinsMap.removeChild(pinsList[i]);
      }
    };
    //  проверка наличия меток
    var elementAvailable = document.querySelector('.map__pin');
    if (elementAvailable) {
      deleted();
    }
  };

  //  рендер меток
  var renderPin = function (appartment, index) {
    //  скрытие карточки объявления
    window.map.cardAvailable();

    deletePins();

    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = appartment.location.x + 'px';
    pinElement.style.top = appartment.location.y + 'px';
    pinElement.querySelector('img').src = appartment.author.avatar;
    pinElement.querySelector('img').alt = appartment.offer.title;
    pinElement.setAttribute('data-id', index);

    return pinElement;
  };

  var render = function (appartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < appartments.length; i++) {
      fragment.appendChild(renderPin(appartments[i], i));
    }
    window.map.similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: render,
    deletePins: deletePins
  };

})();

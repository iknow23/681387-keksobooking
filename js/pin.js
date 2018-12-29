'use strict';

(function () {
  //  создание меток объявлений
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var deletePins = function () {
    //  скрытие меток объявлений
    var deleted = function () {
      var pinsMap = document.querySelector('.map__pins');
      var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinsList.forEach(function (item) {
        pinsMap.removeChild(item);
      });
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

      var realIndex = window.data.appartments.indexOf(appartments[i]);

      fragment.appendChild(renderPin(appartments[i], realIndex));
    }
    window.map.similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: render,
    deletePins: deletePins
  };
})();

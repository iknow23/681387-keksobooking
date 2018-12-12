(function () {
  'use strict';

  //  создание карточки объявления
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * генерация карточки объявления
   * @param {Object} appartment
   * @return {HTMLDomNode}
   */
  var renderCard = function (appartment) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = appartment.author.avatar;
    cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = appartment.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + appartment.offer.checkout;

    if(appartment.offer.features.length) {
      cardElement.querySelector('.popup__features').innerHTML = '';
      for (var j = 0; j < appartment.offer.features.length; j++) {
        var elementLi = document.createElement('li');
        elementLi.className = 'popup__feature popup__feature--' + appartment.offer.features[j];
        cardElement.querySelector('.popup__features').appendChild(elementLi);
      }
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__features'));
    }

    cardElement.querySelector('.popup__description').textContent = appartment.offer.description;

    if(appartment.offer.photos.length) {
      cardElement.querySelector('.popup__photos').innerHTML = '';
      for (var i = 0; i < appartment.offer.photos.length; i++) {
        var elementImg = document.createElement('img');
        elementImg.className = 'popup__photo';
        elementImg.src = appartment.offer.photos[i];
        elementImg.width = 45;
        elementImg.height = 40;
        cardElement.querySelector('.popup__photos').appendChild(elementImg);
        cardElement.querySelector('.popup__photos').querySelector('img').src = appartment.offer.photos[i];
      }
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__photos'));
    }

    return cardElement;
  };

  window.card = renderCard;

})();

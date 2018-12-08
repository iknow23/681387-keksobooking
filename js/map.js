(function () {

'use strict';

var ESC = 27;
var map = document.querySelector('.map');

//  активация страницы, отключаю все элементы ввода формы
var formElements = document.querySelectorAll('fieldset');

for (var j = 0; j < formElements.length; j++) {
  formElements[j].disabled = true;
}

//  перевожу карту в активное состояния
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');

/**
 * скрытие карточки объявления
 */
var deleteOpenedCard = function() {
  var mapCard = document.querySelector('.map__card');
  map.removeChild(mapCard);
};

/**
 * рендер карточек обяъвлений при нажатии на метки
 * @param  {number} pinId
 * @return {Object} newCard
 */
var doCardJob = function(pinId) {
  //  проверка наличия карточки
  var elementAvailable = document.querySelector('.map__card');
  if (elementAvailable) {
    deleteOpenedCard();
  }

  var newCard = renderCard(appartments[pinId]);
  map.insertBefore(newCard, filter);
}

/**
 * рендер карточек объявлений при нажатии на метки
 */
var addPinsClickHandler = function() {
  var pinsList = similarListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', function(evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      doCardJob(pinId);

      var popupCloseButton = document.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', function () {
        deleteOpenedCard();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC) {
          deleteOpenedCard();
        }
      });
    });
  }
};

})();

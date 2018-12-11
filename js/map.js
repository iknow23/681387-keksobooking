(function () {
  'use strict';

  var ESC = 27;
  var map = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');

  /**
   * скрытие карточки объявления
   */
  var deleteOpenedCard = function() {
    var mapCard = document.querySelector('.map__card');
    map.removeChild(mapCard);
  };

  /**
   * рендер карточек объявлений при нажатии на метки
   * @param  {number} pinId
   * @return {Object} newCard
   */
  var doCardJob = function(pinId) {
    //  проверка наличия карточки
    var elementAvailable = document.querySelector('.map__card');
    if (elementAvailable) {
      deleteOpenedCard();
    }

    var newCard = window.card(window.data[pinId]);
    map.insertBefore(newCard, window.filter.filter);
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

  //  активация карты и DRAG-N-DROP
  var pinHandler = document.querySelector('.map__pin--main');

  pinHandler.addEventListener('mousedown', function (evt) {
   evt.preventDefault();

   var startCoords = {
     x: evt.clientX,
     y: evt.clientY
   };

   var activeState = false;

   var onMouseMove = function (moveEvt) {
     moveEvt.preventDefault();
     if (!activeState) {
        // активация карты при перемещении главной метки
        map.classList.remove('map--faded');
        window.filter.mainForm.classList.remove('ad-form--disabled');

        window.backend.load(function (appartments) {
          window.data = appartments;
          var fragment = document.createDocumentFragment();
          for (var i = 0; i < appartments.length; i++) {
            fragment.appendChild(window.pin(appartments[i], i));
          }
          similarListElement.appendChild(fragment);
          for (var i = 0; i < window.filter.formElements.length; i++) {
            window.filter.formElements[i].disabled = false;
          }

          addPinsClickHandler();
        });

        activeState = true;
      }

     var shift = {
       x: startCoords.x - moveEvt.clientX,
       y: startCoords.y - moveEvt.clientY
     };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

     var mainPinHeight = 80;
     var mainPinHalf = 32;
     var bodyRect = document.body.getBoundingClientRect();
     var mapOverlay = document.querySelector('.map__overlay');
     var elemRect = mapOverlay.getBoundingClientRect();
     var offsetLeft   = elemRect.left - bodyRect.left;
     var offsetTop   = elemRect.top - bodyRect.top;
     var offsetRight   = elemRect.right - bodyRect.left;
     var offsetBottom   = elemRect.bottom - bodyRect.top;

     if (moveEvt.pageX < 200) {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (offsetLeft - mainPinHalf) + 'px';
     } else if (moveEvt.pageY < 15) {
        pinHandler.style.top = (offsetTop) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
     } else if (moveEvt.pageX > 1390) {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (offsetRight - mainPinHalf) + 'px';
     } else if (moveEvt.pageY > 700) {
        pinHandler.style.top = (offsetBottom - mainPinHalf) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
     } else {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
     }

     window.filter.fillAdress(pinHandler.offsetLeft + mainPinHalf, pinHandler.offsetTop + mainPinHeight);
   };

   var onMouseUp = function (upEvt) {
     upEvt.preventDefault();

     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mouseup', onMouseUp);

   };

   document.addEventListener('mousemove', onMouseMove);
   document.addEventListener('mouseup', onMouseUp);
  });

})();

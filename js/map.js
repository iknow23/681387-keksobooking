'use strict';

(function () {
  var mainMap = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');

  /**
  * скрытие карточки объявления
  */
  var deleteOpenedCard = function () {
    var mapCard = document.querySelector('.map__card');
    mainMap.removeChild(mapCard);
  };

  //  проверка наличия карточки
  var cardAvailable = function () {
    var elementAvailable = document.querySelector('.map__card');
    if (elementAvailable) {
      deleteOpenedCard();
    }
  };

  //  рендер карточек объявлений при нажатии на метки
  var doCardJob = function (pinId) {
    cardAvailable();

    var newCard = window.card(window.data.appartments[pinId]);
    mainMap.insertBefore(newCard, window.form.filter);
  };

  /**
  * рендер карточек объявлений при нажатии на метки
  */
  var addPinsClickHandler = function () {
    var pinsList = similarListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsList.length; i++) {
      pinsList[i].addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.getAttribute('data-id');
        doCardJob(pinId);

        var popupCloseButton = document.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', function () {
          deleteOpenedCard();
          document.removeEventListener('keydown', documentKeydownHandler);
        });

        var documentKeydownHandler = function (keyEvt) {
          if (keyEvt.keyCode === window.data.Code.ESC) {
            deleteOpenedCard();
            document.removeEventListener('keydown', documentKeydownHandler);
          }
          if (window.form.mainForm.submit || window.form.mainForm.reset) {
            document.removeEventListener('keydown', documentKeydownHandler);
          }
        };

        document.addEventListener('keydown', documentKeydownHandler);
      });
    }
  };

  //  активация карты и DRAG-N-DROP
  var pinHandler = document.querySelector('.map__pin--main');

  var successHandler = function (appartments) {
    window.data.appartments = appartments;
    window.pin.render(appartments.slice(0, 5));

    window.form.enable();

    addPinsClickHandler();
  };

  var activateMap = function () {
    mainMap.classList.remove('map--faded');
    window.form.mainForm.classList.remove('ad-form--disabled');
    window.backend.load(successHandler, window.utils.errorHandler);
  };

  var checkPageState = function () {
    return mainMap.classList.contains('map--faded');
  };

  var onMouseMove;
  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var isPageDisabled = checkPageState();
      if (isPageDisabled) {
        activateMap();
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
      var offsetLeft = elemRect.left - bodyRect.left;
      var offsetTop = elemRect.top - bodyRect.top;
      var offsetRight = elemRect.right - bodyRect.left;
      var offsetBottom = elemRect.bottom - bodyRect.top;

      if (moveEvt.pageX < 200) {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (offsetLeft - mainPinHalf) + 'px';
      } else if (moveEvt.pageY < 180) {
        pinHandler.style.top = (offsetTop + 130) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
      } else if (moveEvt.pageX > 1390) {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (offsetRight - mainPinHalf) + 'px';
      } else if (moveEvt.pageY > 650) {
        pinHandler.style.top = (offsetBottom - 50 - mainPinHalf) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
      } else {
        pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
        pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
      }

      window.form.fillAdress(pinHandler.offsetLeft + mainPinHalf, pinHandler.offsetTop + mainPinHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mainMap: mainMap,
    similarListElement: similarListElement,
    pinHandler: pinHandler,
    cardAvailable: cardAvailable,
    addPinsClickHandler: addPinsClickHandler,
    successHandler: successHandler,
    activateMap: activateMap,
    onMouseMove: onMouseMove
  };
})();

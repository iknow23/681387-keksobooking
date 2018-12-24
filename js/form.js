'use strict';

(function () {

  var mainForm = document.querySelector('.ad-form');

  //  активация страницы, отключаю все элементы ввода формы
  var formElements = document.querySelectorAll('fieldset');

  for (var j = 0; j < formElements.length; j++) {
    formElements[j].disabled = true;
  }

  var fillAdress = function (left, top) {
    var inputAdress = document.querySelector('#address');
    inputAdress.value = left + ', ' + top;
  };

  //  синхронизация кол-ва комнат с кол-вом гостей
  var OfferRoomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var NO_GUESTS_ALLOWED = 100;

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var updateCapacity = function () {
    var selectedRooms = parseInt(roomNumberSelect.options[roomNumberSelect.selectedIndex].value, 10);
    var allowedGuests = OfferRoomsCapacity[selectedRooms];

    capacitySelect.value = selectedRooms;

    if (selectedRooms === NO_GUESTS_ALLOWED) {
      capacitySelect.value = 0;
    }

    capacityOptions.forEach(function (item) {
      item.disabled = true;

      if (allowedGuests.indexOf(item.value) !== -1) {
        item.disabled = false;
      }
    });
  };

  roomNumberSelect.addEventListener('change', updateCapacity);
  capacitySelect.addEventListener('change', updateCapacity);

  //  работа с полями 'тип жилья' и 'цена за ночь'
  var typeOfRoomsSelect = document.querySelector('#type');
  var priceOfRoomsSelect = document.querySelector('#price');

  var typeCostMap = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000
  };

  //  устанавливаю мин стоимость жилья в зависимости от типа
  var typeSelectHandler = function (evt) {
    var current = evt.currentTarget.selectedIndex;
    priceOfRoomsSelect.setAttribute('min', typeCostMap[current]);
    priceOfRoomsSelect.setAttribute('placeholder', typeCostMap[current]);
  };

  typeOfRoomsSelect.addEventListener('change', typeSelectHandler);

  //  работа с полями времени заезда/выезда
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  //  синхронизация полей времени заезда/выезда
  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  mainForm.addEventListener('submit', function (evt) {
    var data = new FormData(mainForm);

    var successHandler = function () {
      var similarElement = document.querySelector('main');
      var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
      var successElement = similarSuccessTemplate.cloneNode(true);

      similarElement.appendChild(successElement);

      document.addEventListener('click', function () {
        similarElement.removeChild(successElement);
      });

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === window.data.Code.ESC) {
          similarElement.removeChild(successElement);
        }
      });

      window.map.mainMap.classList.add('map--faded');
      window.map.cardAvailable();

      var pinsElement = document.querySelector('.map__pins');
      var pinsList = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsList.length; i++) {
        pinsElement.removeChild(pinsList[i]);
      }
      window.map.pinHandler.style.left = '570px';
      window.map.pinHandler.style.top = '375px';

      mainForm.classList.add('ad-form--disabled');
      mainForm.reset();
      disable();

      window.map.pinHandler.addEventListener('click', window.map.successHandler);
    };

    var errorHandler = function () {
      var similarElement = document.querySelector('main');
      var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = similarErrorTemplate.cloneNode(true);

      similarElement.appendChild(errorElement);

      var button = errorElement.querySelector('.error__button');
      button.addEventListener('click', function () {
        similarElement.removeChild(errorElement);
      });
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === window.data.Code.ESC) {
          similarElement.removeChild(errorElement);
        }
      });
    };

    window.backend.upload(data, successHandler, errorHandler);

    evt.preventDefault();
  });

  var enable = function () {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  };

  var disable = function () {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }
  };

  window.form = {
    mainForm: mainForm,
    fillAdress: fillAdress,
    enable: enable
  };

})();

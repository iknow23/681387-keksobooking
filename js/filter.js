(function () {
  'use strict';

  var mainForm = document.querySelector('.ad-form');
  var filter = document.querySelector('.map__filters-container');

  //  активация страницы, отключаю все элементы ввода формы
  var formElements = document.querySelectorAll('fieldset');

  for (var j = 0; j < formElements.length; j++) {
    formElements[j].disabled = true;
  }

  /**
   * заполнение координат метки в поле формы
   * @param {number} left, top
   * @return {numbers}
   */
  var fillAdress = function (left, top) {
    var inputAdress = document.querySelector('#address');
    inputAdress.value = left + ', ' + top;
  };

  //  работа с полями 'кол-во комнат' и 'кол-во мест'
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var roomNumberOptions = roomNumberSelect.querySelectorAll('option');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  /**
   * очистка полей
   */
  var clearOptions = function() {
    for (var i = 0; i < roomNumberOptions.length; i++) {
      roomNumberOptions[i].removeAttribute('selected');
      roomNumberOptions[i].removeAttribute('disabled');
      capacityOptions[i].removeAttribute('selected');
      capacityOptions[i].removeAttribute('disabled');
    }
  };

  /**
   * синхронизация кол-ва комнат с кол-вом гостей
   */
  var roomNumberHandler = function(evt) {
    clearOptions();
    var current = evt.currentTarget.selectedIndex;
    if (current === 0) {
      capacityOptions[0].disabled = true;
      capacityOptions[1].disabled = true;
      capacityOptions[2].selected = true;
      capacityOptions[3].disabled = true;
    } else if (current === 1) {
      capacityOptions[0].disabled = true;
      capacityOptions[1].selected = true;
      capacityOptions[2].selected = true;
      capacityOptions[3].disabled = true;
    } else if (current === 2) {
      capacityOptions[0].selected = true;
      capacityOptions[1].selected = true;
      capacityOptions[2].selected = true;
      capacityOptions[3].disabled = true;
    } else if (current === 3) {
      capacityOptions[0].disabled = true;
      capacityOptions[1].disabled = true;
      capacityOptions[2].disabled = true;
      capacityOptions[3].selected = true;
    }
  };

  /**
   * синхронизация кол-ва комнат с кол-вом гостей
   */
  var capacityHandler = function(evt) {
    clearOptions();
    var current = evt.currentTarget.selectedIndex;
    if (current === 0) {
      roomNumberOptions[2].selected = true;
    } else if (current === 1) {
      roomNumberOptions[1].selected = true;
    } else if (current === 2) {
      roomNumberOptions[0].selected = true;
    } else if (current === 3) {
      roomNumberOptions[3].selected = true;
    }
  };

  roomNumberSelect.addEventListener('change', roomNumberHandler);
  capacitySelect.addEventListener('change', capacityHandler);

  //  работа с полями 'тип жилья' и 'цена за ночь'
  var typeOfRoomsSelect = document.querySelector('#type');
  var priceOfRoomsSelect = document.querySelector('#price');
  /**
   * устанавливаю мин стоимость жилья в зависимости от типа
   */
  var typeSelectHandler = function(evt) {
    var current = evt.currentTarget.selectedIndex;

    if (current === 0) {
      priceOfRoomsSelect.setAttribute('min', 0);
      priceOfRoomsSelect.setAttribute('placeholder', 0);
    } else if (current === 1) {
      priceOfRoomsSelect.setAttribute('min', 1000);
      priceOfRoomsSelect.setAttribute('placeholder', 1000);
    } else if (current === 2) {
      priceOfRoomsSelect.setAttribute('min', 5000);
      priceOfRoomsSelect.setAttribute('placeholder', 5000);
    } else if (current === 3) {
      priceOfRoomsSelect.setAttribute('min', 10000);
      priceOfRoomsSelect.setAttribute('placeholder', 10000);
    }
  };

  typeOfRoomsSelect.addEventListener('change', typeSelectHandler);

  //  работа с полями времени заезда/выезда
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var timeInSelectOptions = timeInSelect.querySelectorAll('option');
  var timeOutSelectOptions = timeOutSelect.querySelectorAll('option');

  /**
   * синхронизация полей времени заезда/выезда
   */
  var selectHandler = function(evt, timeOutSelectOptions) {
    for (var i = 0; i < timeInSelectOptions.length; i++) {
      if(timeInSelectOptions[i].select) {
        timeInSelectOptions[i].removeAttribute('selected');
      }
    }

    for (var i = 0; i < timeOutSelectOptions.length; i++) {
      if(timeOutSelectOptions[i].select) {
        timeOutSelectOptions[i].removeAttribute('selected');
      }
    }

    var current = evt.currentTarget.selectedIndex;
    timeOutSelectOptions[current].selected = true;
  };

  timeInSelect.addEventListener('change', function(evt) {
    selectHandler(evt, timeOutSelectOptions);
  });

  timeOutSelect.addEventListener('change', function(evt) {
    selectHandler(evt, timeInSelectOptions);
  });

  mainForm.addEventListener('submit', function (evt) {
    var data = new FormData(mainForm);

    var successHandler = function (response) {
      var similarElement = document.querySelector('main');
      var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
      var successElement = similarSuccessTemplate.cloneNode(true);

      similarElement.appendChild(successElement);

      document.addEventListener('click', function() {
        similarElement.removeChild(successElement);
      });

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === window.map) {
          similarElement.removeChild(successElement);
        }
      });

      window.map.map.classList.add('map--faded');
      window.map.map.removeChild(document.querySelector('.map__card'));

      var pinsElement = document.querySelector('.map__pins')
      var pinsList = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsList.length; i++) {
        pinsElement.removeChild(pinsList[i]);
      }
      window.map.pinHandler.style.left = '570px';
      window.map.pinHandler.style.top = '375px';

      mainForm.classList.add('ad-form--disabled');
      mainForm.reset();
      disable();
    };

    var errorHandler = function (errorMessage) {
      var similarElement = document.querySelector('main');
      var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = similarErrorTemplate.cloneNode(true);

      similarElement.appendChild(errorElement);

      var button = errorElement.querySelector('.error__button');
      button.addEventListener('click', function() {
        similarElement.removeChild(errorElement);
      });
      document.addEventListener('keydown', function(evt) {
        if(evt.keyCode === window.map) {
          similarElement.removeChild(errorElement);
        }
      });
    }

    window.backend.upload(data, successHandler, errorHandler);

    evt.preventDefault();
  });

  var enable = function() {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  };

  var disable = function() {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }
  };

  window.filter = {
    mainForm: mainForm,
    filter: filter,
    fillAdress: fillAdress,
    enable: enable
  };

})();

'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  //  активация страницы, отключаю все элементы ввода формы
  var formElements = document.querySelectorAll('fieldset');

  for (var j = 0; j < formElements.length; j++) {
    formElements[j].disabled = true;
  }

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
  var clearOptions = function () {
    for (var i = 0; i < roomNumberOptions.length; i++) {
      roomNumberOptions[i].removeAttribute('selected');
      roomNumberOptions[i].removeAttribute('disabled');
      capacityOptions[i].removeAttribute('selected');
      capacityOptions[i].removeAttribute('disabled');
    }
  };

  //  синхронизация кол-ва комнат с кол-вом гостей
  var roomNumberHandler = function (evt) {
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

  //  синхронизация кол-ва комнат с кол-вом гостей
  var capacityHandler = function (evt) {
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

  //  сбрасываю форму и перевожу контент в неактивное состояние
  var resetContent = function () {
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
    mapFilters.reset();
    disable();
    window.filter();
    window.map.pinHandler.addEventListener('click', window.map.onMouseMove);
  };

  //  сбрасываю загруженные картинки в форме
  var resetPreviews = function () {
    var previewAvatar = document.querySelector('.ad-form-header__preview');
    previewAvatar.innerHTML = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';

    var previewAppartmentPhoto = document.querySelector('.ad-form__photo');
    previewAppartmentPhoto.innerHTML = '';
  };

  var successHandler = function () {
    var similarElement = document.querySelector('main');
    var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = similarSuccessTemplate.cloneNode(true);

    similarElement.appendChild(successElement);

    var documentKeydownHandler = function (event) {
      if (event.keyCode === window.data.Code.ESC) {
        similarElement.removeChild(successElement);
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };
    document.addEventListener('keydown', documentKeydownHandler);

    resetContent();
    resetPreviews();
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
    var documentKeydownHandler = function (e) {
      if (e.keyCode === window.data.Code.ESC) {
        similarElement.removeChild(errorElement);
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };
    document.addEventListener('keydown', documentKeydownHandler);
  };

  mainForm.addEventListener('submit', function (evt) {
    var data = new FormData(mainForm);
    window.backend.upload(data, successHandler, errorHandler);
    evt.preventDefault();
  });

  mainForm.addEventListener('reset', function () {
    resetContent();
    resetPreviews();
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

'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var maxPins = 5;

  var filterState = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'filter-wifi': false,
    'filter-dishwasher': false,
    'filter-parking': false,
    'filter-washer': false,
    'filter-elevator': false,
    'filter-conditioner': false
  };

  var filterPins = function () {
    var filteredArray = window.data.appartments.filter(function (pin) {

      var result = false;

      var priceApproval;
      switch (filterState['housing-price']) {
        case 'any':
          priceApproval = true;
          break;
        case 'low':
          priceApproval = pin.offer.price < Price.LOW;
          break;
        case 'middle':
          priceApproval = pin.offer.price >= Price.LOW && pin.offer.price <= Price.HIGH;
          break;
        case 'high':
          priceApproval = pin.offer.price > Price.HIGH;
          break;
      }
      var typeApproval = pin.offer.type === filterState['housing-type'] || filterState['housing-type'] === 'any';
      var roomsApproval = pin.offer.rooms === parseInt(filterState['housing-rooms'], 10) || filterState['housing-rooms'] === 'any';
      var questsApproval = pin.offer.guests === parseInt(filterState['housing-guests'], 10) || filterState['housing-guests'] === 'any';
      var featuresWifiApproval = pin.offer.features.indexOf('wifi') !== -1 || filterState['filter-wifi'] === false;
      var featuresDishwasherApproval = pin.offer.features.indexOf('dishwasher') !== -1 || filterState['filter-dishwasher'] === false;
      var featuresParkingApproval = pin.offer.features.indexOf('parking') !== -1 || filterState['filter-parking'] === false;
      var featuresWasherApproval = pin.offer.features.indexOf('washer') !== -1 || filterState['filter-washer'] === false;
      var featuresElevatorApproval = pin.offer.features.indexOf('elevator') !== -1 || filterState['filter-elevator'] === false;
      var featuresConditionerApproval = pin.offer.features.indexOf('conditioner') !== -1 || filterState['filter-conditioner'] === false;

      if (priceApproval && typeApproval && roomsApproval && questsApproval && featuresWifiApproval && featuresDishwasherApproval && featuresParkingApproval && featuresWasherApproval && featuresElevatorApproval && featuresConditionerApproval) {
        result = true;
      }

      return result;
    });

    return filteredArray;
  };

  //  Функция для debounce (устранение дребезга)
  var getCallbackRenderPins = function () {
    window.pin.render(filterPins().slice(0, maxPins));
    window.map.addPinsClickHandler();
  };

  //  ловлю изменения пользователя на всех select
  var filterFormSelects = document.querySelectorAll('.map__filters select');
  for (var s = 0; s < filterFormSelects.length; s++) {
    filterFormSelects[s].addEventListener('change', function (evt) {

      filterState[evt.target.id] = evt.target.value;

      if (filterPins().length) {
        window.utils.debounce(getCallbackRenderPins);
      } else {
        window.pin.deletePins();
      }
    });
  }

  //  ловлю изменения пользователя на чекбоксах
  var filterFormCheckbox = document.querySelector('.map__features');
  filterFormCheckbox.addEventListener('change', function (evt) {
    if (filterState[evt.target.id] === false) {
      filterState[evt.target.id] = true;
    } else {
      filterState[evt.target.id] = false;
    }
    window.utils.debounce(getCallbackRenderPins);
    document.removeEventListener('keydown', window.map.documentKeydownHandler);
  });

  //  сбрасываю отметки чекбоксов
  var resetCheckbox = function () {
    for (var key in filterState) {
      if (filterState[key] === true) {
        filterState[key] = false;
      }
    }
  };

  window.filter = {
    filterFormCheckbox: filterFormCheckbox,
    resetCheckbox: resetCheckbox
  };
})();

'use strict';
(function () {

  var Price = {
    LOW: 10000,
    MIDDLE: 30000,
    HIGH: 50000
  };

  /**
   * рендерит пины на карте
   * @param  {array} pins
   * @return {array}
   */
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
      if (pin.offer.type === filterState['housing-type'] || filterState['housing-type'] === 'any') {
        if (pin.offer.price === filterState['housing-price'] || filterState['housing-price'] === 'any') {
          if (pin.offer.rooms === filterState['housing-rooms'] || filterState['housing-rooms'] === 'any') {
            if (pin.offer.guests === filterState['housing-guests'] || filterState['housing-guests'] === 'any') {
              if (pin.offer.features.indexOf('wifi') !== -1 || filterState['filter-wifi'] === false) {
                if (pin.offer.features.indexOf('dishwasher') !== -1 || filterState['filter-dishwasher'] === false) {
                  if (pin.offer.features.indexOf('parking') !== -1 || filterState['filter-parking'] === false) {
                    if (pin.offer.features.indexOf('washer') !== -1 || filterState['filter-washer'] === false) {
                      if (pin.offer.features.indexOf('elevator') !== -1 || filterState['filter-elevator'] === false) {
                        if (pin.offer.features.indexOf('conditioner') !== -1 || filterState['filter-conditioner'] === false) {
                          return true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    return filteredArray;
  };

  //  ловлю изменения пользователя и обновляю filterState
  var filterFormSelects = document.querySelectorAll('.map__filters select');
  for (var s = 0; s < filterFormSelects.length; s++) {
    filterFormSelects[s].addEventListener('change', function (evt) {
      filterState[evt.target.id] = evt.target.value;

      // switch (evt.target.value) {
      //   case 'any':
      //     filterState['housing-price'] = 'any';
      //     break;
      //   case 'low':
      //     filterState['housing-price'] = pin.offer.price <= Price.LOW;
      //     break;
      //   case 'middle':
      //     filterState['housing-price'] = pin.offer.price >= Price.LOW && pin.offer.price <= Price.MIDDLE;
      //     break;
      //   case 'high':
      //     filterState['housing-price'] = pin.offer.price >= Price.HIGH;
      //     break;
      // }

      window.pin.render(filterPins());
    });
  }

  var filterFormCheckbox = document.querySelectorAll('.map__checkbox');
  for (var j = 0; j < filterFormCheckbox.length; j++) {
    filterFormCheckbox[j].addEventListener('change', function (evt) {
      filterState[evt.target.id] = true;
      window.pin.render(filterPins());
    });
  }

  //  --------------длинная запись слушателя на чекбоксы----------------------
  //  var filterFormCheckboxWifi = document.querySelector('#filter-wifi');
  //  filterFormCheckboxWifi.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-wifi'] === false) {
  //      filterState['housing-features-wifi'] = true;
  //    } else {
  //      filterState['housing-features-wifi'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });
  //
  //  var filterFormCheckboxDishwasher = document.querySelector('#filter-dishwasher');
  //  filterFormCheckboxDishwasher.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-dishwasher'] === false) {
  //      filterState['housing-features-dishwasher'] = true;
  //    } else {
  //      filterState['housing-features-dishwasher'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });
  //
  //  var filterFormCheckboxDishwasher = document.querySelector('#filter-parking');
  //  filterFormCheckboxDishwasher.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-parking'] === false) {
  //      filterState['housing-features-parking'] = true;
  //    } else {
  //      filterState['housing-features-parking'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });
  //
  //  var filterFormCheckboxDishwasher = document.querySelector('#filter-washer');
  //  filterFormCheckboxDishwasher.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-washer'] === false) {
  //      filterState['housing-features-washer'] = true;
  //    } else {
  //      filterState['housing-features-washer'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });
  //
  //  var filterFormCheckboxDishwasher = document.querySelector('#filter-elevator');
  //  filterFormCheckboxDishwasher.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-elevator'] === false) {
  //      filterState['housing-features-elevator'] = true;
  //    } else {
  //      filterState['housing-features-elevator'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });
  //
  //  var filterFormCheckboxDishwasher = document.querySelector('#filter-conditioner');
  //  filterFormCheckboxDishwasher.addEventListener('change', function (evt) {
  //    if (filterState['housing-features-conditioner'] === false) {
  //      filterState['housing-features-conditioner'] = true;
  //    } else {
  //      filterState['housing-features-conditioner'] = false;
  //    }
  //    window.pin.render(filterPins());
  //  });


})();

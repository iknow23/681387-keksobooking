(function () {
  'use strict';

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
    'housing-features': []
  };

  var filterPins = function () {
    var newPinsArray = window.data.appartments.filter(function (pin) {
      return pin.offer.type === filterState['housing-type'];
    });
    return newPinsArray;
  };

  //  ловлю изменения пользователя и обновляю filterState
  var housingTypeSelect = document.querySelector('#housing-type');
  housingTypeSelect.addEventListener('change', function (evt) {
    filterState['housing-type'] = evt.target.value;

    var filteredPinsArray = filterPins();
    console.log(filteredPinsArray);

    //  перерисовываю метки
    window.pin.render(filteredPinsArray);
  });














  // var housingPriceSelect = document.querySelector('#housing-price');
  // housingPriceSelect.addEventListener('change', function (evt) {
  //   filterState['housing-price'] = evt.target.value;
  //   console.log(filterState);
  // });
  //
  // var housingRoomsSelect = document.querySelector('#housing-rooms');
  // housingRoomsSelect.addEventListener('change', function (evt) {
  //   filterState['housing-rooms'] = evt.target.value;
  //   console.log(filterState);
  // });
  //
  // var housingQuestsSelect = document.querySelector('#housing-guests');
  // housingQuestsSelect.addEventListener('change', function (evt) {
  //   filterState['housing-guests'] = evt.target.value;
  //   console.log(filterState);
  // });
  //
  // var housingFeaturesSelect = document.querySelector('#housing-features');
  // housingFeaturesSelect.addEventListener('change', function (evt) {
  //   filterState['housing-features'].push(evt.target.value);
  //   console.log(evt.target.value);
  //   console.log(filterState);
  // });

})();

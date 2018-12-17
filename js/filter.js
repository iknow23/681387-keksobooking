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
    var typeOfPins = window.data.appartments.filter(function (pin) {
      return pin.offer.type === filterState['housing-type'];
    });

    var priceOfPins = window.data.appartments.filter(function (pin) {
      return pin.offer.price === filterState['housing-price'];
    });

    var roomsOfPins = window.data.appartments.filter(function (pin) {
      return pin.offer.rooms == filterState['housing-rooms'];
    });

    var questsOfPins = window.data.appartments.filter(function (pin) {
      return pin.offer.guests == filterState['housing-guests'];
    });

    var featuresOfPins = window.data.appartments.filter(function (pin) {
      return pin.offer.features === filterState['housing-features'];
    });

    var newPinsArray = typeOfPins;
    newPinsArray = newPinsArray.concat(priceOfPins);
    newPinsArray = newPinsArray.concat(roomsOfPins);
    newPinsArray = newPinsArray.concat(questsOfPins);
    newPinsArray = newPinsArray.concat(featuresOfPins);

    return newPinsArray;
  };

//  var filterPins = function () {
//    var allow = false;
//    var newPinsArray = window.data.appartments.filter(function (pin) {
//      debugger;
//      if (pin.offer.type === filterState['housing-type']) {
//        allow = true;
//      }
//      if (pin.offer.price === filterState['housing-price']) {
//        allow = true;
//      }
//      if (pin.offer.rooms === filterState['housing-rooms']) {
//        allow = true;
//      }
//      if (pin.offer.guests === filterState['housing-guests']) {
//        allow = true;
//      }
//      if (pin.offer.features === filterState['housing-features']) {
//        allow = true;
//      }
//      return true;
//    });
//    return newPinsArray;
//  };

//  var filterPins = function () {
//    var newPinsArray = window.data.appartments.filter(function (pin) {
//      if (pin.offer.type === filterState['housing-type']) {
//        return pin.offer.type === filterState['housing-type'];
//        if (pin.offer.price === filterState['housing-price']) {
//          return pin.offer.price === filterState['housing-price'];
//          if (pin.offer.rooms === filterState['housing-rooms']) {
//            return pin.offer.rooms === filterState['housing-rooms'];
//            if (pin.offer.guests === filterState['housing-guests']) {
//              return pin.offer.guests === filterState['housing-guests'];
//              if (pin.offer.features === filterState['housing-features']) {
//                return pin.offer.features === filterState['housing-features'];
//              }
//            }
//          }
//        }
//      }
//    });
//    return newPinsArray;
//  };


  //  ловлю изменения пользователя и обновляю filterState
  var typeFilter = document.querySelector('#housing-type');
  typeFilter.addEventListener('change', function (evt) {
    filterState['housing-type'] = evt.target.value;
    //  перерисовываю метки
    console.log(filterPins());
    window.pin.render(filterPins());
  });

  var priceFilter = document.querySelector('#housing-price');
  priceFilter.addEventListener('change', function (evt) {
    filterState['housing-price'] = evt.target.value;
    //  перерисовываю метки
    console.log(filterPins());
    window.pin.render(filterPins());
  });

  var roomsFilter = document.querySelector('#housing-rooms');
  roomsFilter.addEventListener('change', function (evt) {
    filterState['housing-rooms'] = evt.target.value;
    //  перерисовываю метки
    console.log(filterPins());
    window.pin.render(filterPins());
  });

  var questsFilter = document.querySelector('#housing-guests');
  questsFilter.addEventListener('change', function (evt) {
    filterState['housing-guests'] = evt.target.value;
    //  перерисовываю метки
    console.log(filterPins());
    window.pin.render(filterPins());
  });

  var featuresFilter = document.querySelector('#housing-features');
  featuresFilter.addEventListener('change', function (evt) {
    filterState['housing-features'].push(evt.target.value);
    //  перерисовываю метки
    console.log(filterPins());
    window.pin.render(filterPins());
  });




//    var pinsss = document.querySelectorAll('.map__pin');
//    for (var i = 0; i < pinsss.length; i++) {
//      pinsss[i].addEventListener('click', function(evt) {
//        window.map.addPinsClickHandler();
//      });
//    }


})();

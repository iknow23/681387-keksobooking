'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 1200;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow; top: 200px; padding: 45px 0px; color: red;';
    node.style.width = '500px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var resetCapacityOptions = function () {
    var capacityOptions = document.querySelectorAll('#capacity option');
    for (var i = 0; i < capacityOptions.length; i++) {
      if (capacityOptions[i].value !== '1') {
        capacityOptions[i].disabled = true;
      } else {
        capacityOptions[i].disabled = false;
        capacityOptions[i].selected = true;
      }
    }
  };

  var lastTimeout;
  var debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    errorHandler: errorHandler,
    resetCapacityOptions: resetCapacityOptions,
    debounce: debounce
  };
})();

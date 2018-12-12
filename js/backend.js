(function () {
  'use strict';

  var LOADURL = 'https://js.dump.academy/keksobooking/data';
  var UPLOADURL = 'https://js.dump.academy/keksobooking';
  var STATUSGOOD = 200;
  var TENSECONDS = 10000;

  /**
   * получение данных с сервера
   * @param  {function} onLoad
   * @param  {function} onError
   * @return {array}
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener ('load', function () {
      if (xhr.status === STATUSGOOD) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener ('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TENSECONDS;

    xhr.open('GET', LOADURL);
    xhr.send();
  };

  /**
   * отправка данных на сервер
   * @param  {object} data
   * @param  {function} onLoad
   * @param  {function} onError
   * @return {array}
   */
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUSGOOD) {
        onLoad(xhr.response);
      } else {
        onError('Статус отправки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener ('error', function () {
      onError('Произошла ошибка');
    });

    xhr.open('POST', UPLOADURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();

'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var Code = {
    GOOD: 200,
    NOT_FOUND: 404
  };
  var TIME_OUT = 10000;

  var activationXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.GOOD:
          onLoad(xhr.response);
          break;
        case Code.NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + ' ' + ' Страница не найдена');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIME_OUT;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = activationXhr(onLoad, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = activationXhr(onLoad, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();

(function () {
  'use strict';
  
  /**
   * получение данных с сервера
   * @param  {function} onLoad
   * @param  {function} onError
   * @return {array}
   */
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener ('load', function () {
      if (xhr.status === 200) {
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
  
    xhr.timeout = 10000;
  
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  }
  
  
  /**
   * отправка данных на сервер
   * @param  {object} data
   * @param  {function} onLoad
   * @param  {function} onError
   * @return {array}
   */
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус отправки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

})();
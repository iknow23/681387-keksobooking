(function () {

'use strict';

//  создание меток объявлений
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * рендер меток
 * @param  {Object} appartments[i]
 * @param  {index} i
 * @return {Object}
 */
var renderPin = function (appartment, index) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.querySelector('img').src = appartment.author;
  pinElement.querySelector('img').alt = appartment.offer.title;
  pinElement.setAttribute('data-id', index);

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i], i));
}


//  -----------------------------DRAG-N-DROP-----------------------
var pinHandler = document.querySelector('.map__pin--main');

pinHandler.addEventListener('mousedown', function (evt) {
 evt.preventDefault();

 var startCoords = {
   x: evt.clientX,
   y: evt.clientY
 };

 var activeState = false;

 var onMouseMove = function (moveEvt) {
   moveEvt.preventDefault();
   if (!activeState) {
     /**
      * активация карты на нажатие на главную метку
      */
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      for (var i = 0; i < formElements.length; i++) {
       formElements[i].disabled = false;
      }
      similarListElement.appendChild(fragment);

      addPinsClickHandler();

      activeState = true;
    }

   var shift = {
     x: startCoords.x - moveEvt.clientX,
     y: startCoords.y - moveEvt.clientY
   };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

   var mainPinHalf = 32;
   var bodyRect = document.body.getBoundingClientRect();
   var mapp = document.querySelector('.map__overlay');
   var elemRect = mapp.getBoundingClientRect();
   var offsetLeft   = elemRect.left - bodyRect.left;
   var offsetTop   = elemRect.top - bodyRect.top;
   var offsetRight   = elemRect.right - bodyRect.left;
   var offsetBottom   = elemRect.bottom - bodyRect.top;

   if (moveEvt.pageX < 200) {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (offsetLeft - mainPinHalf) + 'px';
   } else if (moveEvt.pageY < 15) {
      pinHandler.style.top = (offsetTop) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   } else if (moveEvt.pageX > 1390) {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (offsetRight - mainPinHalf) + 'px';
   } else if (moveEvt.pageY > 700) {
      pinHandler.style.top = (offsetBottom - mainPinHalf) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   } else {
      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';
   }

   fillAdress(pinHandler.offsetLeft, pinHandler.offsetTop);
 };

 var onMouseUp = function (upEvt) {
   upEvt.preventDefault();

   document.removeEventListener('mousemove', onMouseMove);
   document.removeEventListener('mouseup', onMouseUp);

 };

 document.addEventListener('mousemove', onMouseMove);
 document.addEventListener('mouseup', onMouseUp);
});

})();

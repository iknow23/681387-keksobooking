'use strict';

(function () {
  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.avatar.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var imgElement = document.createElement('img');
      preview.appendChild(imgElement);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.style.width = 'auto';
        imgElement.src = reader.result;
        imgElement.width = '70';
        imgElement.height = '70';
        imgElement.style.marginRight = '5px';
      });

      reader.readAsDataURL(file);
    }
  });
})();

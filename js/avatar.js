'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photosUploadChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photosUploadPreview = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosUploadChooser.addEventListener('change', function () {
    var file = photosUploadChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var imgElement = document.createElement('img');
      photosUploadPreview.appendChild(imgElement);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photosUploadPreview.style.width = 'auto';
        imgElement.src = reader.result;
        imgElement.width = '70';
        imgElement.height = '70';
        imgElement.style.marginRight = '5px';
      });

      reader.readAsDataURL(file);
    }
  });
})();

import {deleteClassFromNode} from './service.js';

const FILE_TYPES = [
  'gif',
  'jpg',
  'jpeg',
  'png',
];

const SELECT_AVATAR_ELEMENT = document.querySelector('.ad-form-header__input');
const AVATAR_PREVIEW_ELEMENT = document.querySelector('.ad-form-header__preview img');
const SELECT_PROMO_PHOTO_ELEMENT = document.querySelector('.ad-form__input');
const PROMO_PHOTO_PREVIEW_ELEMENT = document.querySelector('.ad-form__photo img');

function onReadFile (destination, reader) {
  return () => {
    destination.src = reader.result;
  }
}

function createReader (file, destination) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', onReadFile(destination, reader));
}

function createPhotoPreview (destination) {
  return (evt) => {
    const photo = evt.target.files[0];
    const photoName = photo.name.toLowerCase();
    const formatCorrect = FILE_TYPES.some((name) => photoName.endsWith(name));

    if (formatCorrect) {
      deleteClassFromNode(destination, 'visually-hidden');
      createReader(photo, destination);
    }
  }
}

SELECT_AVATAR_ELEMENT.addEventListener('change', createPhotoPreview(AVATAR_PREVIEW_ELEMENT));
SELECT_PROMO_PHOTO_ELEMENT.addEventListener('change', createPhotoPreview(PROMO_PHOTO_PREVIEW_ELEMENT));

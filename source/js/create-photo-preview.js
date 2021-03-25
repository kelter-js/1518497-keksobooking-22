import {
  deleteClassFromNode,
  setNodeProperty,
  addClassToNode
} from './service.js';

import {HIDE_ELEMENT_CLASS} from './error.js';

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
const DEFAULT_IMAGE_PATH = 'img/muffin-grey.svg';

const onReadFile = (destination, reader) => {
  return () => destination.src = reader.result;
}

const createReader = (file, destination) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', onReadFile(destination, reader));
}

const resetPhotoElements = () => {
  addClassToNode(PROMO_PHOTO_PREVIEW_ELEMENT, HIDE_ELEMENT_CLASS);
  setNodeProperty(PROMO_PHOTO_PREVIEW_ELEMENT, 'src', '');
  setNodeProperty(AVATAR_PREVIEW_ELEMENT, 'src', DEFAULT_IMAGE_PATH);
}

const createPhotoPreview = (destination) => {
  return (evt) => {
    const [photo] = evt.target.files;
    const photoName = photo.name.toLowerCase();
    const formatCorrect = FILE_TYPES.some((name) => photoName.endsWith(name));

    if (formatCorrect) {
      deleteClassFromNode(destination, HIDE_ELEMENT_CLASS);
      createReader(photo, destination);
    }
  }
}

SELECT_AVATAR_ELEMENT.addEventListener('change', createPhotoPreview(AVATAR_PREVIEW_ELEMENT));
SELECT_PROMO_PHOTO_ELEMENT.addEventListener('change', createPhotoPreview(PROMO_PHOTO_PREVIEW_ELEMENT));

export {resetPhotoElements};

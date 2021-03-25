
import {deleteNode} from './service.js';

import {resetPhotoElements} from './create-photo-preview.js';

import {
  ADDRESS_ELEMENT,
  setCurrentAddress
} from './page-enabler.js';

import {
  setMarkerCoordinates,
  marker,
  TOKYO_CENTER_LOCATION,
  createMarkersOnMap
} from './map.js';

import {
  onChangeSyncGroupElements,
  AMOUNT_OF_ROOMS,
  GUESTS_AMOUNT_ELEMENT,
  SYNC_GROUP_OPTIONS
} from './validator.js';

import {generatedPromos} from './get-data.js';

const PROMO_FORM_ELEMENT = document.querySelector('.ad-form');
const FILTERS_FORM_ELEMENT = document.querySelector('.map__filters');
const FORM_RESET_BUTTON = document.querySelector('.ad-form__reset');
const PAGE_INNER = document.querySelector('body');
const SUCCESS_MESSAGE_ELEMENT = document.querySelector('#success').content;
const ERROR_MESSAGE_ELEMENT = document.querySelector('#error').content;

const createMessage = (element, selector) => {
  return element.querySelector(`.${selector}`).cloneNode(true);
}

const onKeydownMessage = (node) => {
  return (evt) => evt.code === 'Escape' ? deleteNode(node) : '';
}

const onClickRemoveMessage = (message) => {
  return () => deleteNode(message);
}

const insertErrorMessage = (target) => {
  target.append(createMessage(ERROR_MESSAGE_ELEMENT, 'error'));
  const message = target.querySelector('.error');
  const errorButton = target.querySelector('.error__button');

  document.addEventListener('keydown', onKeydownMessage(message), { once: true });
  document.addEventListener('click', onClickRemoveMessage(message), { once: true });
  errorButton.addEventListener('click', onClickRemoveMessage(message));
}

const insertSuccessMessage = (target) => {
  const message = createMessage(SUCCESS_MESSAGE_ELEMENT, 'success');
  target.append(message);
  document.addEventListener('keydown', onKeydownMessage(message), { once: true });
  document.addEventListener('click', onClickRemoveMessage(message), { once: true });
}

const onFail = () => {
  insertErrorMessage(PAGE_INNER);
}

const onSuccess = () => {
  resetData();
  insertSuccessMessage(PAGE_INNER);
}

const resetData = () => {
  PROMO_FORM_ELEMENT.reset();
  FILTERS_FORM_ELEMENT.reset();
  setMarkerCoordinates(marker, TOKYO_CENTER_LOCATION);
  setCurrentAddress(ADDRESS_ELEMENT, TOKYO_CENTER_LOCATION);
  onChangeSyncGroupElements(AMOUNT_OF_ROOMS, GUESTS_AMOUNT_ELEMENT, SYNC_GROUP_OPTIONS)();
  resetPhotoElements();
  generatedPromos.then((promotions) => createMarkersOnMap(promotions));
}

const setUserFormSubmit = (onSuccess, onFail) => {
  PROMO_FORM_ELEMENT.addEventListener('submit', (evt) => {
    const target = evt.target;
    evt.preventDefault();
    const userData = new FormData(target);
    fetch(
      'https://22.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: userData,
      },
    )
      .then((response) => {
        if(response.ok) {
          onSuccess();
          return;
        }
        onFail();
      })
      .catch(() => {
        onFail();
      });
  });
}

FORM_RESET_BUTTON.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetData();
})

setUserFormSubmit(onSuccess, onFail);

export {setUserFormSubmit};

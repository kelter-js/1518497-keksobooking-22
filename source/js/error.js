import {
  deleteClassFromNode,
  addClassToNode
} from './service.js';

const LOGO_ELEMENT = document.querySelector('.promo');
const MODAL_ELEMENT = document.querySelector('.modal');
const MODAL_CLOSE = MODAL_ELEMENT.querySelector('.modal__button-close');
const MODAL_REFRESH = MODAL_ELEMENT.querySelector('.modal__button-refresh');

function switchHandlers (elements, eventName, handlers, condition) {
  condition ? elements.map((element, index) => element.addEventListener(eventName, handlers[index])) : elements.map((element, index) => element.removeEventListener(eventName, handlers[index]));
}

function closeModal () {
  addClassToNode(this.parentElement, 'visually-hidden');
  switchHandlers([MODAL_CLOSE, MODAL_REFRESH], 'click', [closeModal, refreshPage], false);
}

function refreshPage () {
  document.location.reload();
}

function onFailToLoad () {
  deleteClassFromNode(MODAL_ELEMENT, 'visually-hidden');
  switchHandlers([MODAL_CLOSE, MODAL_REFRESH], 'click', [closeModal, refreshPage], true);
  addClassToNode(LOGO_ELEMENT, 'promo--fail');
  addClassToNode(MODAL_ELEMENT, 'modal--animated');
}

export {onFailToLoad};

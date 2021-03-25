import {
  deleteClassFromNode,
  addClassToNode
} from './service.js';

const LOGO_ELEMENT = document.querySelector('.promo');
const MODAL_ELEMENT = document.querySelector('.modal');
const MODAL_CLOSE = MODAL_ELEMENT.querySelector('.modal__button-close');
const MODAL_REFRESH = MODAL_ELEMENT.querySelector('.modal__button-refresh');
const LOGO_ELEMENT_FAIL_CLASS = 'promo--fail';
const MODAL_ELEMENT_ANIMATION_CLASS = 'modal--animated';
const HIDE_ELEMENT_CLASS = 'visually-hidden';

const switchHandlers = (elements, eventName, handlers, needAdd) => {
  elements.map((element, index) => needAdd ? (
    element.addEventListener(eventName, handlers[index])
  ) : (
    element.removeEventListener(eventName, handlers[index])
  ),
  );
}

const onCloseModal = () => {
  addClassToNode(this.parentElement, HIDE_ELEMENT_CLASS);
  switchHandlers([MODAL_CLOSE, MODAL_REFRESH], 'click', [onCloseModal, onRefreshPage]);
}

const onRefreshPage = () => document.location.reload();

const onFailToLoad = () => {
  deleteClassFromNode(MODAL_ELEMENT, HIDE_ELEMENT_CLASS);
  switchHandlers([MODAL_CLOSE, MODAL_REFRESH], 'click', [onCloseModal, onRefreshPage], true);
  addClassToNode(LOGO_ELEMENT, LOGO_ELEMENT_FAIL_CLASS);
  addClassToNode(MODAL_ELEMENT, MODAL_ELEMENT_ANIMATION_CLASS);
}

export {
  onFailToLoad,
  HIDE_ELEMENT_CLASS
};

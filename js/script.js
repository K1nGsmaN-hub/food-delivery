import tabs from './modules/tabs'
import modal from './modules/modal'
import forms from './modules/forms'
import timer from './modules/timer'
import slider from './modules/slider'
import cards from './modules/cards'
import calc from './modules/calc'
import {openModalWindow} from './modules/modal'

window.addEventListener('DOMContentLoaded', () => {
  const timeOutID = setTimeout(() => openModalWindow('.modal', timeOutID), 15000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
  modal('[data-modal]', '.modal', timeOutID)
  forms('form', timeOutID)
  timer('.timer', '2020-09-01')
  cards()
  calc()
  slider({
    container: '.offer__slider',
    slides: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    curCounter: '#current',
    totCounter: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner '
  })
})

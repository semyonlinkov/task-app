import {createEvent, createStore} from 'effector'

export const setNav = createEvent();

export const $nav = createStore('my').on(setNav, (_, payload) => payload)

export const changeMenuToogle = createEvent();

export const $menuToogle = createStore(false).on(changeMenuToogle, (_, payload) => payload)
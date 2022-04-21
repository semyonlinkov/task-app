import {createEvent, createStore} from 'effector'

export const setNav = createEvent();

export const $nav = createStore('my').on(setNav, (_, payload) => payload)

export const changeMenuToggle = createEvent();

export const $menuToggle = createStore(false).on(changeMenuToggle, (_, payload) => payload)
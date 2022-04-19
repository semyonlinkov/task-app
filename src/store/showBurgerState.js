import { createEvent, createStore } from 'effector'

export const setShowBurger = createEvent();

export const $showBurger = createStore(true).on(setShowBurger, (_, payload) => payload);
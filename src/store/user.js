import { createEvent, createStore } from 'effector'

export const setUser = createEvent();

export const $user = createStore({ ID: 0 }).on(setUser, (_, payload) => payload);
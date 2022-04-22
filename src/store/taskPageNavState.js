import { createEvent, createStore } from 'effector'

export const setTaskPageNav = createEvent();

export const $taskPageNav = createStore('info').on(setTaskPageNav, (_, payload) => payload)

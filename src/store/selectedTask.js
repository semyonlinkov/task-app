import {createEvent, createStore} from 'effector'

export const setSingleTask = createEvent();

export const $singleTask = createStore(0).on(setSingleTask, (_, payload) => payload)



import { createEvent, createStore } from 'effector'

export const setToogle = createEvent();

export const $toogleValue = createStore('gettedTasks').on(
	setToogle,
	(prev) => prev === 'gettedTasks' ? 'takenTasks' : 'gettedTasks'
);
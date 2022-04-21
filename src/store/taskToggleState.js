import { createEvent, createStore } from 'effector'

export const setToggle = createEvent();

export const $toggleValue = createStore('gettedTasks').on(
	setToggle,
	(prev) => prev === 'gettedTasks' ? 'takenTasks' : 'gettedTasks'
);
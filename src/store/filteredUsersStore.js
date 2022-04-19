import { createEvent, createStore } from 'effector'

export const setFilteredUsers = createEvent();

export const $filteredUsers = createStore([]).on(
	setFilteredUsers,
	(_, payload) => payload
);
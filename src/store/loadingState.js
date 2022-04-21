import { createEvent, createStore } from 'effector'

export const setIsLoading = createEvent();

export const $isLoading = createStore(false).on(
	setIsLoading,
	(_, payload) => payload
);
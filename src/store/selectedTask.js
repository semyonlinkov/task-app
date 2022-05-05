import { createEvent, createStore } from 'effector'

export const setSingleTask = createEvent();
export const mutateTask = createEvent();

export const $singleTask = createStore({});

$singleTask.on(setSingleTask, (_, payload) => payload);
$singleTask.on(mutateTask, (prevState, payload) => ({ ...prevState, ...payload }));


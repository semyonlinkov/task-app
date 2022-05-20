import { createStore, createEffect } from 'effector';
import { $linkServer } from '../$config';

export const getAllMessages = createEffect(async (id) => {
	try {
		const req = await fetch(`${$linkServer}/getComments.php?id=${id}`);

		return req.json();
	} catch (err) {
		console.log(err);
	}
})

export const $allMessages = createStore([]).on(
	getAllMessages.doneData,
	(_, data) => data
);
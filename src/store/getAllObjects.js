import { createStore, createEffect, combine, createEvent } from 'effector';

export const getAllObjects = createEffect(async () => {
	try {
		const url = 'getObjects.php';
		const base = 'https://volga24bot.com/andromeda';
		const req = await fetch(`${base}/${url}`);

		return req.json();
	} catch (err) {
		console.log(err);
	}
})

export const $allObjects = createStore([]).on(
	getAllObjects.doneData,
	(_, data) => data
);
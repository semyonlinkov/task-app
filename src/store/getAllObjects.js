import { createStore, createEffect, combine, createEvent } from 'effector';
// import { setIsLoading } from './loadingState';

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

export const setSelectedValue = createEvent();

export const $selectedValue = createStore('').on(
	setSelectedValue, (_, payload) => payload
);


export const $objectStatus = combine(
	$allObjects, $selectedValue,
	(allObjects, input) => {
		console.log(input);
		if (input.length >= 3) {
			return allObjects;
		} else {
			return [];
		}
	}
)


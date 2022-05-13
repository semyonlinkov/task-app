import { createStore, createEffect, combine, createEvent } from 'effector'
import { $toggleValue } from './taskToggleState';
import { $user } from './user';


export const getCustomerByPhone = createEffect(async (phone) => {
	try {
		const url = `getCustByPhone.php/?phone=${phone}`;

		const base = 'https://volga24bot.com/andromeda';
		const req = await fetch(`${base}/${url}`);

		return req.json();
	} catch (err) {
		console.log(err);
	}
})

export const $customers = createStore([]).on(
	getCustomerByPhone.doneData,
	(_, data) => data
);
import { createStore, createEffect, combine } from 'effector';
import { setIsLoading } from './loadingState';

export const getCustomerByPhone = createEffect(async (phone) => {
	try {
		const url = `getCustByPhone.php/?phone=${phone}`;
		const base = 'https://volga24bot.com/andromeda';
		const req = await fetch(`${base}/${url}`);
		return req.json();
	} catch (err) {
		console.log(err);
	} finally {
		setIsLoading(false);
	}
})

export const $customers = createStore({}).on(
	getCustomerByPhone.doneData,
	(_, data) => data
);
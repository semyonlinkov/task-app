import { createStore, createEffect, combine, createEvent } from 'effector';
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

export const setIsSameNumber = createEvent();

export const $isSameNumber = createStore(0).on(
	setIsSameNumber, (prev, payload) => prev === payload
);

export const $customersStatus = combine($customers, $isSameNumber,
	(customers, isSameNumber) => {
		if (isSameNumber) {
			return {}
		} else {
			return customers
		}
	})
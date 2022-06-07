import { createStore, createEffect, combine, createEvent } from 'effector';

export const getCustomerByPhone = createEffect(async ({ phone, setShowObjectsPopUp, setIsLoading }) => {
	try {
		const url = `getCustByPhone.php/?phone=${phone}`;
		const base = 'https://volga24bot.com/andromeda';
		const req = await fetch(`${base}/${url}`);
		const json = await req.json();

		if (json.OBJ.length) setShowObjectsPopUp(true);

		return json;
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
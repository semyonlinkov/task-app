import { createEffect, createStore } from "effector";


export const getWorkers = createEffect(async () => {
	const req = await fetch(`https://volga24bot.com/bot/test2.php?application_token=2ac721c25667b3e8f30e782b9dca97fd`);

	return req.json()
})

export const $getWorkers = createStore([]).on(
	getWorkers.doneData,
	(_, data) => data
)
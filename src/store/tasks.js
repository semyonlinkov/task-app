import { createStore, createEffect, combine, createEvent } from 'effector'
import { $toggleValue } from './taskToggleState';
import { $user } from './user';


export const getTasks = createEffect(async (id) => {
	const url = `getTasks.php/?id=${id}`;

	const base = 'https://volga24bot.com/tasks';
	const req = await fetch(`${base}/${url}`);

	return req.json();
})

export const $tasks = createStore([]).on(
	getTasks.doneData,
	(_, data) => data
)

export const $taskStatus = combine(
	$tasks, getTasks.pending, $user,
	(data, isLoading, user) => {
		if (isLoading) {
			return []
		} else {
			return data.filter(task => task.customerID == user.ID);
		}
	}
)

export const $customersStatus = combine(
	$tasks, getTasks.pending, $toggleValue, $user,
	(data, isLoading, toggle, user) => {
		if (isLoading) {
			return []
		} else {
			if (toggle === 'gettedTasks') {
				return data.filter(task => task.customerID == user.ID);
			}
			if (toggle === 'takenTasks') {
				let customers = [];

				const newData = data.filter(task => task.creatorID == user.ID);
				newData.forEach(el => {
					if (customers.indexOf(el.customer) === -1) {
						customers.push(el.customer);
					}
				})
				return customers;
			}
		}
	}
)


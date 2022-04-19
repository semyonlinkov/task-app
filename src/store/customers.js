import { createStore, createEffect, combine } from 'effector'
import { $toogleValue } from './taskToogleState';
import { $user } from './user';


export const getCustomers = createEffect(async (id) => {
	const url = `getTasks.php/?id=${id}`;

	const base = 'https://volga24bot.com/tasks';
	const req = await fetch(`${base}/${url}`);

	return req.json()
})


const $customers = createStore([]).on(
	getCustomers.doneData,
	(_, data) => data
)

export const $customersStatus = combine(
	$customers, getCustomers.pending, $toogleValue, $user,
	(data, isLoading, toogle, user) => {
		if (isLoading) {
			return []
		} else {
			console.log(data)
			if (toogle === 'gettedTasks') {
				return data.filter(task => task.customerID == user.ID)
			}
			if (toogle === 'takenTasks') {
				let customers = [];
				const newData = data.filter(task => task.creatorID == user.ID);
				newData.forEach(el => {
					if (customers.indexOf(el.customer) === -1) {
						customers.push(el.customer)
					}
				})

				console.log(first)
				return customers;
			}
		}
	}
)
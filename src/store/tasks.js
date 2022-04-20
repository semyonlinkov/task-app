import { createStore, createEffect, combine } from 'effector'
import { $toogleValue } from './taskToogleState';
import { $user } from './user';
import {$singleTask} from "./selectedTask";


export const getTasks = createEffect(async (id) => {
	const url = `getTasks.php/?id=${id}`;

	const base = 'https://volga24bot.com/tasks';
	const req = await fetch(`${base}/${url}`);

	return req.json();
})


const $tasks = createStore([]).on(
	getTasks.doneData,
	(_, data) => data
)

export const $taskStatus = combine(
	$tasks, getTasks.pending, $toogleValue, $user,
	(data, isLoading, toogle, user) => {
		if (isLoading) {
			return []
		} else {
			if (toogle === 'gettedTasks') {
				return data.filter(task => task.customerID == user.ID);
			}
			if (toogle === 'takenTasks') {
				let customers = [];
				const newData = data.filter(task => task.creatorID == user.ID);
				newData.forEach(el => {
					if (customers.indexOf(el.customer) === -1) {
						customers.push(el.customer);
					}
				})
				return newData;
			}
		}
	}
)

export const $customersStatus = combine(
	$tasks, getTasks.pending, $toogleValue, $user,
	(data, isLoading, toogle, user) => {
		if (isLoading) {
			return []
		} else {
			if (toogle === 'gettedTasks') {
				return data.filter(task => task.customerID == user.ID);
			}
			if (toogle === 'takenTasks') {
				let customers = [];

				const newData = data.filter(task => task.creatorID == user.ID);
				console.log(newData)
				newData.forEach(el => {
					if (customers.indexOf(el.customer) === -1) {
						console.log(customers, el.customer)
						customers.push(el.customer);
					}
				})
				return customers;
			}
		}
	}
)


export const $showSingleTask = combine(
	$tasks, getTasks.pending, $singleTask,
	(data, isLoading, id) => {
		if (isLoading) {
			return []
		} else {

			return data.filter(el => el.id === id)[0]
		}

	}
)
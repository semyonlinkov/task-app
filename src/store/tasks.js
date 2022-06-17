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

export const setDataFilter = createEvent();

export const $dataFilter = createStore('Все').on(
	setDataFilter,
	(prev, data) => {
		if (prev === data) {
			return 'Все'
		} else {
			return data;
		}
	}
)

export const $taskStatus = combine(
	$tasks, getTasks.pending, $toggleValue, $user, $dataFilter,
	(data, isLoading, toggle, user, dataFilter) => {

		if (isLoading) {
			return []
		} else {
			// console.log(data);

			if (toggle === 'gettedTasks') {
				const defectFirstData = [
					...[...data].filter(task => task.status === 'Брак'),
					...[...data].filter(task => task.status !== 'Брак')
				];
				return defectFirstData.filter(task => (task.customerID === user.ID || task.so_customerID === user.ID) && task.status !== 'Выполнено');
			}
			if (toggle === 'takenTasks') {
				if (dataFilter === 'Новая') {
					return data.filter(task => task.status === 'Новая').filter(task => task.customerID !== user.ID && task.completed !== '1');
				} else if (dataFilter === 'В работе') {
					return data.filter(task => task.status === 'В работе').filter(task => task.customerID !== user.ID && task.completed !== '1')
				} else if (dataFilter === 'Выполнено') {
					return data.filter(task => task.status === 'Выполнено').filter(task => task.customerID !== user.ID && task.completed !== '1')
				} else if (dataFilter === 'Брак') {
					return data.filter(task => task.status === 'Брак').filter(task => task.customerID !== user.ID && task.completed !== '1')
				} else if (dataFilter === 'Все') {
					return data.filter(task => task.customerID !== user.ID && task.completed !== '1')
				} else {
					return data.filter(task => task.customerID !== user.ID && task.completed !== '1')
				}
			}
		}
	}
)

export const $customersStatus = combine(
	$tasks, getTasks.pending, $toggleValue, $user, $dataFilter,
	(data, isLoading, toggle, user, filter) => {
		if (isLoading) {
			return []
		} else {
			if (toggle === 'takenTasks') {
				let customers = [];
				const newData = data.filter(task => task.creatorID == user.ID && task.completed !== '1' && (task.status === filter || filter === 'Все'));
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


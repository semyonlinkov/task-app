import React, { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $customersStatus, $taskStatus, getTasks } from '../../store/tasks';
import { useStore } from 'effector-react';
import styles from './TaskCards.module.scss';
import TaskDropdown from '../TasksDropdown/TaskDropdown';

const TaskCardsBlock = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user])


	return (
		<div className={styles.wrapper}>
			{customers.map(customer => (<>
				<TaskDropdown customer={customer.customer} amountOfTasks={tasks.filter(task => task.creatorID === user.ID).length}>
					{tasks.map(task => (
						task.name === user.name ? <TaskCard task={task} key={task.id} /> : null
					))}
				</TaskDropdown>
			</>))}
		</div>
	)
}

export default TaskCardsBlock
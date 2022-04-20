import React, { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $customersStatus, $taskStatus, getTasks } from '../../store/tasks';
import { $toogleValue } from '../../store/taskToogleState';
import { useStore } from 'effector-react';
import styles from './TaskCards.module.scss';
import TaskDropdown from './TasksDropdown/TaskDropdown';


const TaskCardsBlock = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toogleValue = useStore($toogleValue);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user])

	return (
		<div className={styles.wrapper}>
			{toogleValue === 'gettedTasks'
				?
				tasks.map(task => (
					<TaskCard task={task} key={task.id} />
				))
				:
				customers.map(name => (
					<TaskDropdown name={name} key={name} />
				))
			}
		</div>
	)
}

export default TaskCardsBlock
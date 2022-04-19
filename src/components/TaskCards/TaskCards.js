import React, { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $taskStatus, getTasks } from '../../store/tasks';
import { useStore } from 'effector-react';
import styles from './TaskCards.module.scss';
import TaskDropdown from '../TasksDropdown/TaskDropdown';

const TaskCardsBlock = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user])

	return (
		<div className={styles.wrapper}>
			<TaskDropdown >
				{tasks.map(task => (
					<TaskCard task={task} key={task.id} />
				))}
			</TaskDropdown>
		</div>
	)
}

export default TaskCardsBlock
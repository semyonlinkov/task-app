import React, { useEffect } from 'react'
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $customersStatus, $taskStatus, getTasks } from '../../store/tasks';
import { $toggleValue } from '../../store/taskToggleState';
import { useStore } from 'effector-react';
import styles from './TaskCards.module.scss';
import TaskDropdown from './TasksDropdown/TaskDropdown';


const TaskCardsBlock = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toggleValue = useStore($toggleValue);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user])


	return (
		<div className={styles.wrapper}>
			{toggleValue === 'gettedTasks'
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
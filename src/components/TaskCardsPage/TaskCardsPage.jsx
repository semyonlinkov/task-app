import { useLayoutEffect, useState } from 'react';
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $customersStatus, $filter, $taskStatus, getTasks, setFilter } from '../../store/tasks';
import { $toggleValue } from '../../store/taskToggleState';
import { useStore } from 'effector-react';
import TaskDropdown from './TasksDropdown/TaskDropdown';
import styles from './TaskCardsPage.module.scss';

const TaskCardsPage = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toggleValue = useStore($toggleValue);
	const filter = useStore($filter);

	useLayoutEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user, filter]);

	return (
		<>
			{toggleValue === 'takenTasks' && (
				<ul className={styles.task_filter}>
					<li className={filter === 'Новая' ? styles.choosen : null} onClick={() => setFilter('Новая')}>
						<div className={`${styles.task_mark} ${styles.new}`}></div>
						<p>Новая</p>
					</li>
					<li className={filter === 'В работе' ? styles.choosen : null} onClick={() => setFilter('В работе')}>
						<div className={`${styles.task_mark} ${styles.in_progress}`}></div>
						<p>В работе</p>
					</li>
					<li className={filter === 'Выполнено' ? styles.choosen : null} onClick={() => setFilter('Выполнено')}>
						<div className={`${styles.task_mark} ${styles.done}`}></div>
						<p>Выполнено</p>
					</li>
				</ul>
			)}
			{toggleValue === 'gettedTasks'
				? tasks.map((task) => <TaskCard task={task} key={task.id} />)
				: customers.map((name) => <TaskDropdown name={name} key={name} />)}
		</>
	);
};

export default TaskCardsPage;

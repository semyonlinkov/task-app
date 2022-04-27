import { useStore } from 'effector-react';
import React from 'react';
import { $filter, setFilter } from '../../../store/tasks';
import styles from './TasksFilter.module.scss';

const TasksFilter = () => {
	const filter = useStore($filter);

	return (
		<ul className={styles.wrapper}>
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
	);
};

export default TasksFilter;

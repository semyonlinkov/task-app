import { useStore } from 'effector-react';
import React from 'react';
import { $dataFilter, setDataFilter } from '../../../store/tasks';
import styles from './TasksFilter.module.scss';

const TasksFilter = () => {
	const dataFilter = useStore($dataFilter);

	return (
		<ul className={styles.wrapper}>
			<li className={dataFilter === 'Новая' ? styles.choosen : null} onClick={() => setDataFilter('Новая')}>
				<div className={`${styles.task_mark} ${styles.new}`}></div>
				<p>Новая</p>
			</li>
			<li className={dataFilter === 'В работе' ? styles.choosen : null} onClick={() => setDataFilter('В работе')}>
				<div className={`${styles.task_mark} ${styles.in_progress}`}></div>
				<p>В работе</p>
			</li>
			<li className={dataFilter === 'Выполнено' ? styles.choosen : null} onClick={() => setDataFilter('Выполнено')}>
				<div className={`${styles.task_mark} ${styles.done}`}></div>
				<p>Выполнено</p>
			</li>
		</ul>
	);
};

export default TasksFilter;

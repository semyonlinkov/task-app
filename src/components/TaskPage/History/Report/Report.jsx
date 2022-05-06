import React from 'react';
import styles from './Report.module.scss';

const Report = ({ task }) => {
	console.log(task);

	return (
		<div className={styles.wrapper}>
			<p className={styles.task_name}>Задача: {task.title}</p>
			<p className={styles.status}>Статус: {task.status}</p>
			<p className={styles.comment}>{task.report_comment}</p>
			<p className={styles.date}>{task.timeEnd}</p>
		</div>
	);
};

export default Report;

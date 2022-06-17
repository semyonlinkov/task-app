import React from 'react';
import styles from './GettedTasksFilter.module.scss';

const GettedTasksFilter = ({ setGettedTasksType, gettedTasksType }) => {
	return (
		<ul className={styles.wrapper}>
			<li
				className={gettedTasksType === 'common' ? styles.choosen : null}
				onClick={() => setGettedTasksType('common')}>
				{/* <div className={`${styles.task_mark} ${styles.new}`}></div> */}
				<p>Задачи отдела</p>
			</li>
			<li
				className={gettedTasksType === 'personal' ? styles.choosen : null}
				onClick={() => setGettedTasksType('personal')}>
				{/* <div className={`${styles.task_mark} ${styles.in_progress}`}></div> */}
				<p>Личные задачи</p>
			</li>
		</ul>
	);
};

export default GettedTasksFilter;

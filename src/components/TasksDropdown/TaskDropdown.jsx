import React from 'react';
import styles from './TaskDropdown.module.scss';

const TaskDropdown = ({ customer, amountOfTasks, children }) => {
	return (
		<div className={styles.wrapper} >
			{customer} - {amountOfTasks}
			{children}
		</div>
	);
};

export default TaskDropdown;

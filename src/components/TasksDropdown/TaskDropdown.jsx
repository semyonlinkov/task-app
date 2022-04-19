import React from 'react';
import styles from './TaskDropdown.module.scss';

const TaskDropdown = ({ name = 'abame', count = 0, children }) => {
	return (
		<div className={styles.wrapper} >
			{name} - {count}
			{children}
		</div>
	);
};

export default TaskDropdown;

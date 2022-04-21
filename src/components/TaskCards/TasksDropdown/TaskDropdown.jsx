import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { $taskStatus } from '../../../store/tasks';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskDropdown.module.scss';
import chevron from '../../../img/chevron-down.png';

const TaskDropdown = ({ name }) => {
	const tasks = useStore($taskStatus);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setFilteredTasks(tasks.filter((task) => task.customer === name));
	}, []);

	const tasksHandler = () => {
		setFilteredTasks(tasks.filter((task) => task.customer === name));
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown} onClick={tasksHandler}>
				<p className={styles.title}>
					{name} - {filteredTasks.length} Задач
				</p>
				<input
					className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
					type="image"
					src={chevron}
				/>
			</div>
			{isOpen ? filteredTasks.map((task) => <TaskCard task={task} key={task.id} />) : null}
		</div>
	);
};

export default TaskDropdown;

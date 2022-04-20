import { useStore } from 'effector-react';
import React, { useState } from 'react';
import { $taskStatus } from '../../../store/tasks';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskDropdown.module.scss';
import chevron from '../../../img/chevron-down.png';

const TaskDropdown = ({ name, amountOfTasks = 10 }) => {
	const tasks = useStore($taskStatus);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const tasksHandler = () => {
		setFilteredTasks(tasks.filter((task) => task.customer === name));
		setIsOpen((prev) => !prev);
	};

	console.log(filteredTasks);

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown} onClick={tasksHandler}>
				<p>
					{name} - {amountOfTasks} Задач
				</p>
				<input
					className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
					type="image"
					src={chevron}
				/>
			</div>
			{isOpen ? tasks.map((task) => <TaskCard task={task} key={task.id} />) : null}
		</div>
	);
};

export default TaskDropdown;

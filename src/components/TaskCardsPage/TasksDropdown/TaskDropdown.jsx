import { useStore } from 'effector-react';
import { useState, useEffect } from 'react';
import { $taskStatus } from '../../../store/tasks';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskDropdown.module.scss';
import ImgChevron from '../../../img/chevronDown32.png';

const TaskDropdown = ({ name }) => {
	const tasks = useStore($taskStatus);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setFilteredTasks(tasks.filter((task) => task.customer === name));
	}, [name, tasks]);

	const tasksHandler = () => {
		setFilteredTasks(tasks.filter((task) => task.customer === name));
		setIsOpen((prev) => !prev);
	};

	const shortName = () => {
		const arrName = name.split(' ');
		return arrName.length < 3 ? `${arrName[0]} ${arrName[1]}` : `${arrName[0]} ${arrName[1][0]}.${arrName[2][0]}`;
	};

	const numWord = (value, words) => {
		value = Math.abs(value) % 100;
		const num = value % 10;
		if (value > 10 && value < 20) return words[2];
		if (num > 1 && num < 5) return words[1];
		if (num == 1) return words[0];
		return words[2];
	};

	return (
		<>
			<div className={styles.dropdown} onClick={tasksHandler}>
				<input
					className={`${styles.chevron} ${isOpen ? styles.open : null}`}
					type="image"
					alt="chevron"
					src={ImgChevron}
				/>
				<p className={styles.title}>
					{shortName()} - {filteredTasks.length} {numWord(filteredTasks.length, ['Задача', 'Задачи', 'Задач'])}
				</p>
			</div>
			{isOpen ? filteredTasks.map((task) => <TaskCard task={task} key={task.id} />) : null}
		</>
	);
};

export default TaskDropdown;

import { useEffect } from 'react';
import { TaskCard } from './TaskCard/TaskCard';

import styles from './TaskCardsPage.module.scss';
import { $user } from '../../store/user';
import { $customersStatus, $dataFilter, $taskStatus, getTasks } from '../../store/tasks';
import { $toggleValue } from '../../store/taskToggleState';
import { useStore } from 'effector-react';
import TaskDropdown from './TasksDropdown/TaskDropdown';
import TasksFilter from './TasksFilter/TasksFilter';

const TaskCardsPage = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toggleValue = useStore($toggleValue);
	const dataFilter = useStore($dataFilter);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user, dataFilter]);

	return (
		<div className={styles.wrapper}>
			{toggleValue === 'takenTasks' && <TasksFilter />}
			{!tasks?.length && toggleValue === 'gettedTasks' && (
				<p className={styles.not_tasks}>У вас нет поставленных задач</p>
			)}
			{!customers?.length && toggleValue === 'takenTasks' && (
				<p className={styles.not_tasks}>Вы еще не поставили задачу</p>
			)}
			{toggleValue === 'gettedTasks'
				? tasks.map((task) => <TaskCard task={task} key={task.id} />)
				: customers.map((name) => <TaskDropdown name={name} key={name} />)}
		</div>
	);
};

export default TaskCardsPage;

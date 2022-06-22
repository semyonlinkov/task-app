import { useEffect, useState } from 'react';
import { TaskCard } from './TaskCard/TaskCard';

import styles from './TaskCardsPage.module.scss';
import { $user } from '../../store/user';
import { $customersStatus, $dataFilter, $gettedTasksType, $taskStatus, getTasks } from '../../store/tasks';
import { $toggleValue } from '../../store/taskToggleState';
import { useStore } from 'effector-react';
import TaskDropdown from './TasksDropdown/TaskDropdown';
import TasksFilter from './TasksFilter/TasksFilter';
import GettedTasksFilter from './GettedTasksFilter/GettedTasksFilter';

const TaskCardsPage = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toggleValue = useStore($toggleValue);
	const gettedTasksType = useStore($gettedTasksType);
	const dataFilter = useStore($dataFilter);

	useEffect(() => {
		if (user.ID !== 0) {
			getTasks({ id: user.ID, department: user.DEPARTMENT });
		}
	}, [user, dataFilter]);

	// console.log(tasks);
	// console.log(gettedTasksType);

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters_block}>
				{toggleValue === 'takenTasks' && <TasksFilter />}

				{toggleValue === 'gettedTasks' && <GettedTasksFilter />}
			</div>

			<div className={styles.tasks_block}>
				{!tasks?.length && toggleValue === 'gettedTasks' && gettedTasksType === 'personal' && (
					<p className={styles.not_tasks}>Нет поставленных вам задач</p>
				)}

				{/* {!tasks?.length && toggleValue === 'gettedTasks' && gettedTasksType === 'common' && (
					<p className={styles.not_tasks}>Нет поставленных вашему отделу задач</p>
				)} */}

				{!customers?.length && toggleValue === 'takenTasks' && (
					<p className={styles.not_tasks}>Нет поставленных вами задач</p>
				)}

				{toggleValue === 'gettedTasks' && gettedTasksType === 'personal'
					? tasks.map((task) => <TaskCard task={task} key={task.id} />)
					: null}

				{toggleValue === 'gettedTasks' && gettedTasksType === 'common'
					? tasks.map((task) => <TaskCard task={task} key={task.id} />)
					: null}

				{toggleValue === 'takenTasks' ? customers.map((name) => <TaskDropdown name={name} key={name} />) : null}
			</div>
		</div>
	);
};

export default TaskCardsPage;

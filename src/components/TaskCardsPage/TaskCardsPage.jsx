import { useLayoutEffect } from 'react';
import { TaskCard } from './TaskCard/TaskCard';

import { $user } from '../../store/user';
import { $customersStatus, $taskStatus, getTasks } from '../../store/tasks';
import { $toggleValue } from '../../store/taskToggleState';
import { useStore } from 'effector-react';
import TaskDropdown from './TasksDropdown/TaskDropdown';

const TaskCardsPage = () => {
	const user = useStore($user);
	const tasks = useStore($taskStatus);
	const customers = useStore($customersStatus);
	const toggleValue = useStore($toggleValue);

	useLayoutEffect(() => {
		if (user.ID !== 0) {
			getTasks(user.ID);
		}
	}, [user]);

	console.log('render'); //* дохуя рендеров

	return (
		<>
			{toggleValue === 'gettedTasks'
				? tasks.map((task) => <TaskCard task={task} key={task.id} />)
				: customers.map((name) => <TaskDropdown name={name} key={name} />)}
		</>
	);
};

export default TaskCardsPage;

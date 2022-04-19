import { useStore } from 'effector-react';
import React from 'react';
import { $filteredUsers, setFilteredUsers } from '../../store/filteredUsersStore';
import { $taskStatus } from '../../store/tasks';
import { $user, setUser } from '../../store/user';
import styles from './TaskDropdown.module.scss';

// const user = useStore($user);
// const tasks = useStore($taskStatus);
// const filteredUser = useStore($filteredUsers);

// const filterTaskByUser = () => {
// 	setFilteredUsers(tasks.filter((task) => task.customerID == user.ID));
// };

const TaskDropdown = ({ name = 'abame', count = 0, children }) => {
	return (
		<div className={styles.wrapper} >
			{name} - {count}
			{children}
		</div>
	);
};

export default TaskDropdown;

import { useStore } from 'effector-react';
import React from 'react';
import { $taskPageNav, setTaskPageNav } from '../../../store/taskPageNavState';
import Trash from '../../../img/trash.png';
import Check from '../../../img/check.png';
import styles from './TaskPageFooter.module.scss';

const TaskPageFooter = () => {
	const taskPageNav = useStore($taskPageNav);

	return (
		<ul className={styles.wrapper}>
			<li>
				<img src={Trash} alt="" />
			</li>
			<li>
				<img src={Check} alt="" />
			</li>
		</ul>
	);
};

export default TaskPageFooter;

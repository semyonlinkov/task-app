import { useStore } from 'effector-react';
import React from 'react';
import { $taskPageNav, setTaskPageNav } from '../../../store/taskPageNavState';
import Info from '../../../img/icons8-info-50.png';
import Files from '../../../img/icons8-cloud-file-40.png';
import History from '../../../img/icons8-time-machine-40.png';
import styles from './TaskPageFooter.module.scss';

const TaskPageFooter = () => {
	const taskPageNav = useStore($taskPageNav);

	return (
		<ul className={styles.wrapper}>
			<li onClick={() => setTaskPageNav('info')} className={taskPageNav === 'info' ? styles.active : null}>
				<img src={Info} alt="" />
			</li>
			<li onClick={() => setTaskPageNav('files')} className={taskPageNav === 'files' ? styles.active : null}>
				<img src={Files} alt="" />
			</li>
			<li onClick={() => setTaskPageNav('history')} className={taskPageNav === 'history' ? styles.active : null}>
				<img src={History} alt="" />
			</li>
		</ul>
	);
};

export default TaskPageFooter;

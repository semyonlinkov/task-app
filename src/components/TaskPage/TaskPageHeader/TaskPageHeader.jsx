import React from 'react';
import styles from './TaskPageHeader.module.scss';
import Info from '../../../img/info.png';
import Files from '../../../img/icons8-cloud-file-40.png';
import History from '../../../img/icons8-time-machine-40.png';
import Chat from '../../../img/icons8-chat-40.png';
import { $taskPageNav, setTaskPageNav } from '../../../store/taskPageNavState';
import { useStore } from 'effector-react';

const TaskPageHeader = () => {
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
			<li onClick={() => setTaskPageNav('chat')} className={taskPageNav === 'chat' ? styles.active : null}>
				<img src={Chat} alt="" />
			</li>
		</ul>
	);
};

export default TaskPageHeader;

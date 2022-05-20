import React, { useEffect, useState } from 'react';
import styles from './TaskPageHeader.module.scss';
import ImgInfo from '../../../img/info64.png';
import Files from '../../../img/icons8-cloud-file-40.png';
import History from '../../../img/icons8-time-machine-40.png';
import Chat from '../../../img/icons8-chat-40.png';
import { $taskPageNav, setTaskPageNav } from '../../../store/taskPageNavState';
import { useStore } from 'effector-react';
import { $allMessages } from '../../../store/getAllMessages';
import { $user } from '../../../store/user';

const TaskPageHeader = () => {
	const taskPageNav = useStore($taskPageNav);
	const allMessages = useStore($allMessages);
	const user = useStore($user);

	const [unreadedMark, setUnreadedMark] = useState(false);

	useEffect(() => {
		setUnreadedMark(
			allMessages.findIndex((message) => message.senderID !== user.ID && message.view === '0') === -1 ? false : true,
		);
	}, [allMessages]);

	return (
		<ul className={styles.wrapper}>
			<li onClick={() => setTaskPageNav('info')} className={taskPageNav === 'info' ? styles.active : null}>
				<img src={ImgInfo} alt="" />
			</li>
			<li onClick={() => setTaskPageNav('files')} className={taskPageNav === 'files' ? styles.active : null}>
				<img src={Files} alt="" />
			</li>
			<li onClick={() => setTaskPageNav('history')} className={taskPageNav === 'history' ? styles.active : null}>
				<img src={History} alt="" />
			</li>
			<li
				onClick={() => {
					setTaskPageNav('chat');
					setUnreadedMark(false);
				}}
				className={taskPageNav === 'chat' ? styles.active : null}>
				{unreadedMark && <div className={styles.unreaded_mark}>!</div>}
				<img src={Chat} alt="" />
			</li>
		</ul>
	);
};

export default TaskPageHeader;

import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './TaskPage.module.scss';
import { setSingleTask } from '../../store/selectedTask';
import { useStore } from 'effector-react';

import TaskPageHeader from './TaskPageHeader/TaskPageHeader';
import TaskPageFooter from './TaskPageFooter/TaskPageFooter';
import { $taskPageNav, setTaskPageNav } from '../../store/taskPageNavState';
import Info from './Info/Info';
import Files from './Files/Files';
import History from './History/History';
import Chat from './Chat/Chat';
import { $tasks } from '../../store/tasks';

const TaskPage = () => {
	const tasks = useStore($tasks);
	const taskPageNav = useStore($taskPageNav);

	const { id } = useParams();

	useEffect(() => {
		setSingleTask(tasks.filter((el) => el.id === id)[0]);
		return () => setTaskPageNav('info');
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<TaskPageHeader />
			</div>
			<div className={styles.content}>
				{/* {
					{
						info: <Info />,
						files: <Files />,
						history: <History />,
						chat: <Chat />,
					}[taskPageNav]
				} */}
				{taskPageNav === 'info' && <Info />}
				{taskPageNav === 'files' && <Files />}
				{taskPageNav === 'history' && <History />}
				{taskPageNav === 'chat' && <Chat />}
			</div>
			<div className={styles.footer}>{taskPageNav !== 'chat' && <TaskPageFooter />}</div>
		</div>
	);
};

export default TaskPage;

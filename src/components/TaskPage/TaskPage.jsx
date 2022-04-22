import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './TaskPage.module.scss';
import { setSingleTask } from '../../store/selectedTask';
import { $showSingleTask } from '../../store/tasks';
import { useStore } from 'effector-react';

import TaskPageHeader from './TaskPageHeader/TaskPageHeader';
import TaskPageFooter from './TaskPageFooter/TaskPageFooter';
import { $taskPageNav } from '../../store/taskPageNavState';
import Info from './Info/Info';
import Files from './Files/Files';
import History from './History/History';
import Chat from './Chat/Chat';

const Task = () => {
	const { id } = useParams();

	const taskPageNav = useStore($taskPageNav);

	useLayoutEffect(() => {
		setSingleTask(id);
		return () => {
			setSingleTask(0);
		};
	}, []);

	return (
		<div styles={styles.wrapper}>
			<TaskPageHeader />
			{taskPageNav === 'info' && <Info />}
			{taskPageNav === 'files' && <Files />}
			{taskPageNav === 'history' && <History />}
			{taskPageNav === 'chat' && <Chat />}
			{taskPageNav !== 'chat' && <TaskPageFooter />}
		</div>
	);
};

export default Task;

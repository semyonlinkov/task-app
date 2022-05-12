import { useStore } from 'effector-react';
import React from 'react';
import Trash from '../../../img/trash.png';
import Check from '../../../img/check.png';
import Arrow from '../../../img/red-arrow.png';
import styles from './TaskPageFooter.module.scss';
import { deleteTask } from '../../../services-api/deleteTask';
import { useNavigate } from 'react-router-dom';
import { $singleTask, setSingleTask } from '../../../store/selectedTask';
import { $user } from '../../../store/user';
import { deffectTask } from '../../../services-api/deffectTask';

const TaskPageFooter = () => {
	const navigate = useNavigate();

	const user = useStore($user);
	const task = useStore($singleTask);

	return (
		<ul className={styles.wrapper}>
			{task.customerID !== user.ID && (
				<li onClick={() => deleteTask(task.id, () => navigate('/'))}>
					<img src={Trash} alt="trash" />
				</li>
			)}
			{task.status !== 'Брак' && task.creatorID === user.ID && (
				<>
					<li onClick={() => deffectTask(task.id, () => navigate('/'), setSingleTask)}>
						<img src={Arrow} alt="defect" />
					</li>
					{task.status === 'Выполнено' && (
						<li>
							<img src={Check} alt="get_job" />
						</li>
					)}
				</>
			)}
		</ul>
	);
};

export default TaskPageFooter;

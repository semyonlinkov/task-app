import { useStore } from 'effector-react';
import React from 'react';
import Trash from '../../../img/trash.png';
import Check from '../../../img/check.png';
import Arrow from '../../../img/red-arrow.png';
import styles from './TaskPageFooter.module.scss';
import { deleteTask } from '../../../services-api/deleteTask';
import { useNavigate } from 'react-router-dom';
import { $singleTask } from '../../../store/selectedTask';
import { $user } from '../../../store/user';

const TaskPageFooter = () => {
	const navigate = useNavigate();

	const user = useStore($user);
	const task = useStore($singleTask);

	console.log(task);
	console.log(user);

	return (
		<ul className={styles.wrapper}>
			<li onClick={() => deleteTask(task.id, () => navigate('/'))}>
				<img src={Trash} alt="" />
			</li>
			{task.status === 'Выполнено' && task.creatorID === user.ID && (
				<>
					<li>
						<img src={Arrow} alt="dispose" />
					</li>
					<li>
						<img src={Check} alt="get_job" />
					</li>
				</>
			)}
		</ul>
	);
};

export default TaskPageFooter;

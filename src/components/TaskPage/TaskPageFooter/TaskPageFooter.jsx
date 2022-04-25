import { useStore } from 'effector-react';
import React from 'react';
import Trash from '../../../img/trash.png';
import Check from '../../../img/check.png';
import styles from './TaskPageFooter.module.scss';
import {deleteTask} from "../../../services-api/deleteTask";
import {useNavigate} from "react-router-dom";
import {$singleTask} from "../../../store/selectedTask";


const TaskPageFooter = () => {
	const navigate = useNavigate();
	const task = useStore($singleTask);
	return (
		<ul className={styles.wrapper}>
			<li onClick={() => deleteTask(task.id, () => navigate('/'))}>
				<img src={Trash} alt="" />
			</li>
			{task.status === 'Выполнено' ? <li >
				<img src={Check} alt="" />
			</li> : null}
		</ul>
	);
};

export default TaskPageFooter;

import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TaskCard.module.scss';

export const TaskCard = ({ task }) => {
	const navigate = useNavigate();

	const putStatusMark = () => {
		if (task.status === 'Новая') {
			return styles.new
		} else if (task.status === 'В работе') {
			return styles.in_progress
		} else if (task.status === 'Выполнено') {
			return styles.done
		}
	}

	const getNormalName = (name) => {
		const nameArray = name.split(' ');
		if (nameArray.length < 3) {
			return `${nameArray[0]} ${nameArray[1]}`
		} else {
			return `${nameArray[0]} ${nameArray[1][0]}.${nameArray[2][0]}`
		}
	}


	return (
		<div onClick={() => navigate(`/tasks/${task.id}`)} className={`${styles.wrapper} p-2`}>
			<div className={`${styles.indication_mark} ${putStatusMark()}`}></div>
			<div className={styles.task_data}>
				{task.object_name && <p style={{fontSize: 14}}>{task.object_name}</p>}
				{task.object_address && <p style={{fontSize: 14}}>{task.object_address}</p>}
				{task.desc && <p className={styles.desc}>{task.desc}</p>}
				{task.creatorName && <p>Постановщик: <span>{getNormalName(task.creatorName)}</span></p>}
				{task.client_phone || task.clinet_name ? <p>Данные клиента: <span>{task.client_phone} - {task.clinet_name}</span></p> : null}
				{task.date_deadline !== '0000-00-00 00:00:00' ? <p>Выполнить до: <span>{moment(task.date_deadline).format('DD.MM.YYYY')}</span></p> : null}

				{task.date_create && <p className={styles.date}>{moment(task.date_create).format('DD.MM.YYYY')}</p>}
			</div>
		</div >
	)
}

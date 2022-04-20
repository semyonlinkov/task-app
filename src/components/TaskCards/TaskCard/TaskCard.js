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

	return (
		<div onClick={() => navigate(`/tasks/${task.id}`)} className={`${styles.wrapper} p-2`}>
			<div className={`${styles.indication_mark} ${putStatusMark()}`}></div>
			<div className={styles.task_data}>
				{task.status && <p><b>Статус задачи</b>: {task.status}</p>}
				{task.client && <p><b>Клиент</b>: {task.client}</p>}
				{task.client_phone && <p><b>Номер телефона</b>: {task.client_phone}</p>}
				{task.creator_name && <p><b>Постановщик</b>: {task.creator_name}</p>}
				{task.departament && <p><b>Отдел</b>: {task.departament}</p>}
				{task.customer && <p><b>Выполняющий</b>: {task.customer}</p>}
				{task.so_customer && <p><b>Совыполняющий</b>: {task.so_customer}</p>}
				{task.desc && <p><b>Описание задачи</b>: {task.desc}</p>}
				{task.date_create && <p className={styles.date}><b>Дата</b>: {moment(task.date_create).format('MMMM Do YYYY')}</p>}
			</div>
		</div >
	)
}

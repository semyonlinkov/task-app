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
			<div className={styles.title_wrapper}>
				<div className={`${styles.indication_mark} ${putStatusMark()}`}></div>
				<h3>{task.status}</h3>
			</div >
			<p><b>Клиент</b>: {task.client}</p>
			<p><b>Номер телефона</b>: {task.client_phone}</p>
			<p><b>Постановщик</b>: {task.creator_name}</p>
			<p><b>Отдел</b>: {task.departament}</p>
			<p><b>Выполняющий</b>: {task.customer}</p>
			<p><b>Совыполняющий</b>: {task.so_customer}</p>
			<p><b>Описание задачи</b>: {task.desc}</p>
			<p className={styles.date}><b>Дата</b>: {task.date}</p>
			<hr />
		</div >
	)
}

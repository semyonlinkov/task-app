import React, {useEffect} from 'react';
import styles from './Info.module.scss';

import Info from '../../../img/icons8-info-50.png';
import Phone from '../../../img/icons8-phone-50.png';
import moment from 'moment';
import { useStore } from 'effector-react';
import {$user} from "../../../store/user";
import {setReaded} from "../../../services-api/setReaded";
import {startTask} from "../../../services-api/startTask";
import {$singleTask} from "../../../store/selectedTask";

const MainData = () => {
	const task = useStore($singleTask);
	const user = useStore($user);

	useEffect(() => {
		if (task.id && task.readed === '0000-00-00 00:00:00') {
			setReaded(task.id)
		}

	}, [task])



	return (
		<div className={styles.wrapper}>
			<div className={styles.status}>
				<div
					className={`${styles.circleStatus} ${
						task.status === 'Новая' ? styles.red : task.status === 'В работе' ? styles.orange : styles.green
					}`}></div>
				<p>Задача {task.status}</p>
			</div>
			<p className={styles.title}>{task.title}</p>
			{task.object_name ? (
				<p>
					<span>Название объекта:</span> {task.object_name}
				</p>
			) : null}
			{task.object_address ? (
				<p>
					<span>Адрес объекта:</span> {task.object_address}
				</p>
			) : null}
			{task.date_deadline !== '0000-00-00 00:00:00' ? (
				<p>
					<span>Срок выполнения</span> до{' '}
					<span style={{ fontWeight: 500 }}>{moment(task.date_deadline).format('DD.MM HH:mm')}</span>
				</p>
			) : null}
			<p>
				<span>Постановщик:</span> {task.creatorName}
			</p>

			<div className={styles.info_blocks}>
				<img src={Info} alt="" />
				<p>{task.desc}</p>
			</div>
			<div className={styles.info_blocks}>
				<img src={Phone} alt="" />
				<p>
					<a href={`tel:${task.client_phone}`}>{task.client_phone}</a> - {task.clinet_name}
				</p>
			</div>

			{user.ID === task.customerID && task.status === 'Новая' ? <button className={`${styles.start_btn} ${styles.btn}`} onClick={() => startTask(task.id)}>Взять в работу</button> : null}
			{user.ID === task.customerID && task.status === 'В работе' ? <button className={`${styles.finish_btn} ${styles.btn}`} onClick={() => startTask(task.id)}>Завершить работу</button> : null}

		</div>
	);
};

export default MainData;

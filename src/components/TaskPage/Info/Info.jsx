import React from 'react';
import styles from './Info.module.scss';

import Info from '../../../img/icons8-info-50.png';
import Phone from '../../../img/icons8-phone-50.png';
import moment from 'moment';
import { useStore } from 'effector-react';
import { $showSingleTask } from '../../../store/tasks';

const MainData = () => {
	const task = useStore($showSingleTask);

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

			<button className={styles.start_btn}>Взять в работу</button>
		</div>
	);
};

export default MainData;

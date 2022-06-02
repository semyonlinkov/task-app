import React, { useEffect, useState } from 'react';
import styles from './MainInfo.module.scss';

import Info from '../../../../img/icons8-info-50.png';
import ImgExclMark from '../../../../img/exclMark32.png';
import Phone from '../../../../img/icons8-phone-50.png';
import ImgUser from '../../../../img/user32.png';
import moment from 'moment';
import { useStore } from 'effector-react';
import { $user } from '../../../../store/user';
import { setReaded } from '../../../../services-api/setReaded';
import { startTask } from '../../../../services-api/startTask';
import { $singleTask, mutateTask } from '../../../../store/selectedTask';
import TaskRaportForm from './TaskRaportForm/TaskRaportForm';
import { setHistory } from '../../../../services-api/setHistory';
import ChangeExecutorForm from './ChangeExecutorForm/ChangeExecutorForm';

const MainData = () => {
	const task = useStore($singleTask);
	const user = useStore($user);

	const [showRaportForm, setShowRaportForm] = useState(false);
	const [showChangeExecutorForm, setShowChangeExecutorForm] = useState(false);

	useEffect(() => {
		if (task.readed === '0000-00-00 00:00:00' && user.ID === task.customerID) {
			setHistory(task.id, 'view', '', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`, (a) =>
				mutateTask({ readed: a }),
			);
			setReaded(task.id);
		}
	}, []);

	const putStatusMark = () => {
		if (task.status === 'Новая') {
			return styles.new;
		} else if (task.status === 'В работе') {
			return styles.in_progress;
		} else if (task.status === 'Выполнено') {
			return styles.done;
		} else if (task.status === 'Брак') {
			return styles.defect;
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.status}>
				<div className={`${styles.circleStatus} ${putStatusMark()}`}></div>
				<p>Задача {task.status}</p>
			</div>

			<p className={styles.title}>{task.title}</p>

			{task.object_name && (
				<p>
					<span>Название объекта:</span> {task.object_name}
				</p>
			)}

			{task.object_address && (
				<p>
					<span>Адрес объекта:</span> {task.object_address}
				</p>
			)}

			{task.date_deadline !== '0000-00-00 00:00:00' && (
				<p>
					<span>Срок выполнения</span> до{' '}
					<span style={{ fontWeight: 500 }}>{moment(task.date_deadline).format('DD.MM HH:mm')}</span>
				</p>
			)}

			<p>
				<span>Постановщик:</span> {task.creatorName}
			</p>

			<div className={styles.info_blocks}>
				<img src={ImgUser} alt="" />
				<p>Имя клиента: {task.clinet_name}</p>
			</div>

			<div className={styles.info_blocks}>
				<img src={Phone} alt="" />
				<p>
					<a href={`tel:${task.client_phone}`}>{task.client_phone}</a>
				</p>
			</div>

			<div className={styles.info_blocks}>
				<img src={Info} alt="" />
				<p>{task.desc}</p>
			</div>

			{task.deffect_comment && (
				<div className={`${styles.info_blocks} ${styles.defect_block}`}>
					<img src={ImgExclMark} alt="" />
					<p>{task.deffect_comment}</p>
				</div>
			)}

			<div className={styles.btns_group}>
				{(user.ID === task.customerID || task.so_customerID === user.ID) && task.status === 'Новая' ? (
					<button
						className={`${styles.start_btn} ${styles.btn}`}
						onClick={() => {
							setHistory(task.id, 'start', '', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`);
							startTask(task.id);
						}}>
						Взять в работу
					</button>
				) : null}
				{(user.ID === task.customerID || task.so_customerID === user.ID) && task.status === 'В работе' ? (
					<button className={`${styles.finish_btn} ${styles.btn}`} onClick={() => setShowRaportForm(true)}>
						Завершить работу
					</button>
				) : null}
				{(user.ID === task.customerID || task.so_customerID === user.ID) && task.status === 'Брак' ? (
					<button className={`${styles.defect_btn} ${styles.btn}`} onClick={() => setShowRaportForm(true)}>
						Изменить отчёт
					</button>
				) : null}
				<button
					className={`${styles.add_note_btn} ${styles.btn}`}
					onClick={() => {
						const answer = prompt('Введите примечание');
						setHistory(task.id, 'comment', answer, `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`, () =>
							alert('Примечание добавлено успешно'),
						);
					}}>
					Добавить примечание
				</button>
				{user.ID === task.customerID ? (
					<button
						className={`${styles.change_executer_btn} ${styles.btn}`}
						onClick={() => {
							setShowChangeExecutorForm(true);
						}}>
						Сменить исполнителя
					</button>
				) : null}
			</div>

			{showRaportForm && <TaskRaportForm close={() => setShowRaportForm(false)} task={task} user={user} />}
			{showChangeExecutorForm && (
				<ChangeExecutorForm close={() => setShowChangeExecutorForm(false)} task={task} user={user} />
			)}
		</div>
	);
};

export default MainData;

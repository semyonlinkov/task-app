import React, { useEffect, useState } from 'react';
import styles from './ChangeInfo.module.scss';

import Info from '../../../../img/icons8-info-50.png';
import Phone from '../../../../img/icons8-phone-50.png';
import moment from 'moment';
import { useStore } from 'effector-react';
import { $user } from '../../../../store/user';
import { setReaded } from '../../../../services-api/setReaded';
import { $singleTask } from '../../../../store/selectedTask';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { changeTask } from '../../../../services-api/changeTask';
import User from '../../../../img/user.png';

const MainData = () => {
	const task = useStore($singleTask);
	const user = useStore($user);

	const [tel, setTel] = useState(task.client_phone);

	const { register, handleSubmit, watch, setValue, getValues } = useForm();

	const onSubmit = (data) => changeTask(data, tel, user);

	useEffect(() => {
		if (task.id && task.readed === '0000-00-00 00:00:00' && user.ID === task.customerID) {
			setReaded(task.id);
		}

		if (task.deffect_comment) {
			setValue('deffect_comment', task.deffect_comment);
		}

		setValue('object_name', task.object_name);
		setValue('object_address', task.object_address);
		setValue('clinet_name', task.clinet_name);
		setValue('desc', task.desc);
		setValue('id', task.id);
	}, [task]);

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

	// console.log(task.id);
	// console.log(watch());

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<div className={styles.status}>
				<div className={`${styles.circleStatus} ${putStatusMark()}`}></div>
				<p>Задача {task.status}</p>
			</div>
			<p className={styles.title}>{task.title}</p>
			<p>
				<span>Название объекта:</span>
				<input {...register('object_name')} type="text" />
			</p>
			<p>
				<span>Адрес объекта:</span>
				<input {...register('object_address')} type="text" />
			</p>
			{/* <p>
				<span>Срок выполнения</span>
				<span style={{ fontWeight: 500 }}>{moment(task.date_deadline).format('DD.MM HH:mm')}</span>
				<input type="date" value={task.date_deadline} />
			</p> */}
			{/* <p>
				<span>Постановщик:</span> {task.creatorName}
			</p> */}

			{/* //? че с ебаным браком */}
			{task.deffect_comment && (
				<div className={`${styles.info_blocks} ${styles.defect_block}`}>
					<img src={Info} alt="" />
					<textarea {...register('deffect_comment')} name="" id=""></textarea>
				</div>
			)}

			<div className={styles.info_blocks}>
				<img src={User} alt="client-name" />
				<p>Имя Клиента:</p>
				<input {...register('clinet_name')} type="text" />
			</div>

			<div className={styles.info_blocks}>
				<img src={Info} alt="description" />
				<p>Комментарий:</p>
				<textarea {...register('desc')}></textarea>
			</div>

			<div className={styles.info_blocks}>
				<img src={Phone} alt="phone-number" />
				<p>Телефон:</p>
				<p>
					<InputMask mask="+7\ 999 999-99-99" maskChar={''} value={tel} onChange={(e) => setTel(e.target.value)}>
						{(inputProps) => <input {...inputProps} type="tel" disableunderline="true" />}
					</InputMask>
				</p>
			</div>
			<button type="submit">Принять изменения</button>
		</form>
	);
};

export default MainData;
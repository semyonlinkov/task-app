import React, { useEffect, useState } from 'react';
import styles from './ChangeInfo.module.scss';

import Info from '../../../../img/icons8-info-50.png';
import ExclMark from '../../../../img/exclMark32.png';
import Phone from '../../../../img/icons8-phone-50.png';
import { useStore } from 'effector-react';
import { $user } from '../../../../store/user';
import { setReaded } from '../../../../services-api/setReaded';
import { $singleTask, setSingleTask } from '../../../../store/selectedTask';
import { useForm } from 'react-hook-form';
import { changeTask } from '../../../../services-api/changeTask';
import ImgUser from '../../../../img/user32.png';
import ImgDone from '../../../../img/checkBlue32.png';
import {setHistory} from "../../../../services-api/setHistory";

const ChangeInfo = ({ setIsMainInfo }) => {
	const task = useStore($singleTask);
	const user = useStore($user);

	const [phone, setPhone] = useState(task.client_phone);

	// const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const { register, handleSubmit, setValue } = useForm();

	const onSubmit = (data) => changeTask(data, phone, user, setIsMainInfo, setSingleTask);

	useEffect(() => {


		if (task.deffect_comment) {
			setValue('deffect_comment', task.deffect_comment);
		}

		setValue('object_name', task.object_name);
		setValue('object_address', task.object_address);
		setValue('clinet_name', task.clinet_name);
		setValue('desc', task.desc);
		setValue('id', task.id);
	}, [task, user.ID]);

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
	// console.log(task);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<div className={styles.status}>
				<div className={`${styles.circleStatus} ${putStatusMark()}`}></div>
				<p>Задача {task.status}</p>
			</div>
			<p className={styles.title}>{task.title}</p>
			<div className={styles.object_name}>
				<span>Название объекта:</span>
				<input {...register('object_name')} type="text" />
			</div>
			<div className={styles.object_address}>
				<span>Адрес объекта:</span>
				<input {...register('object_address')} type="text" />
			</div>
			{/* <p>
				<span>Срок выполнения</span>
				<span style={{ fontWeight: 500 }}>{moment(task.date_deadline).format('DD.MM HH:mm')}</span>
				<input type="date" value={task.date_deadline} />
			</p> */}

			<div className={styles.info_blocks}>
				<img src={ImgUser} alt="client-name" />
				<p>Имя Клиента:</p>
				<input {...register('clinet_name')} type="text" />
			</div>

			<div className={styles.info_blocks}>
				<img src={Phone} alt="phone-number" />
				<p>Телефон:</p>
				<input
					value={phone}
					onChange={(e) => {
						let phoneNumber = e.target.value;
						if (phoneNumber.length !== 12) {
							let formatPhone = phoneNumber.replace('+7', '8').replace(/[^\d]/g, '');
							if (formatPhone.length - 1 < 11) {
								setPhone(formatPhone);
							}
						}
					}}></input>
			</div>

			<div className={styles.info_blocks}>
				<img src={Info} alt="description" />
				<textarea {...register('desc')}></textarea>
			</div>

			{task.deffect_comment && (
				<div className={`${styles.info_blocks} ${styles.defect_block}`}>
					<img src={ExclMark} alt="" />
					<textarea {...register('deffect_comment')} name="" id=""></textarea>
				</div>
			)}

			<button
				className={styles.sub_btn}
				style={{ backgroundImage: `url(${ImgDone})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}
				type="submit"
			/>
		</form>
	);
};

export default ChangeInfo;

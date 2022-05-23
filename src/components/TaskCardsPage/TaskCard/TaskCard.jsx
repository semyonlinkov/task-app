import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styles from './TaskCard.module.scss';

export const TaskCard = ({ task }) => {
	const navigate = useNavigate();

	const putStatusMark = () => {
		if (task.status === 'Новая') {
			return styles.new_mark;
		} else if (task.status === 'В работе') {
			return styles.in_progress_mark;
		} else if (task.status === 'Выполнено') {
			return styles.done_mark;
		} else if (task.status === 'Брак') {
			return styles.defect_mark;
		}
	};

	const getNormalName = (name) => {
		const nameArray = name.split(' ');
		if (nameArray.length < 3) {
			return `${nameArray[0]} ${nameArray[1]}`;
		} else {
			return `${nameArray[0]} ${nameArray[1][0]}.${nameArray[2][0]}`;
		}
	};

	return (
		<div className={`${styles.wrapper} `} onClick={() => navigate(`/tasks/${task.id}`)}>
			<div className={`${styles.indication_mark} ${putStatusMark()}`}></div>
			{task.status === 'Брак' && <div className={styles.brack_shtamp}>Брак</div>}
			<div className={styles.task_data}>
				<div className={styles.flex_div}>
					<div>
						{task.object_address && (
							<p>
								<span>Адресс объекта:</span> {task.object_address}
							</p>
						)}
						{task.object_name && (
							<p>
								<span>Название объекта:</span> {task.object_name}
							</p>
						)}
					</div>
					{task.readed !== '0000-00-00 00:00:00' && (
						<div className={styles.readed}>
							<p>Прочитано</p>
							<p>{moment(task.readed).format('DD.MM.YYYY HH:mm')}</p>
						</div>
					)}
				</div>

				{task.desc && (
					<p className={styles.desc}>
						<span>Описание:</span> {task.desc}
					</p>
				)}

				{task.deffect_comment && (
					<p className={`${styles.desc} ${styles.defect}`}>
						<span>Брак:</span> {task.deffect_comment}
					</p>
				)}

				{task.creatorName && (
					<p>
						<span>Постановщик: </span>
						{getNormalName(task.creatorName)}
					</p>
				)}

				{task.client_phone || task.clinet_name ? (
					<p>
						<span>Данные клиента:</span> {task.client_phone} - {task.clinet_name}
					</p>
				) : null}
				{task.date_deadline !== '0000-00-00 00:00:00' && (
					<p>
						<span>Выполнить до:</span> {moment(task.date_deadline).format('DD.MM.YYYY')}
					</p>
				)}

				{task.date_create && (
					<p className={styles.date}>
						<span>{moment(task.date_create).format('DD.MM.YYYY hh:mm')}</span>
					</p>
				)}
			</div>
		</div>
	);
};

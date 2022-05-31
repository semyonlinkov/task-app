import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styles from './TaskCard.module.scss';
import ImgExclMark from '../../../img/exclMarkYellow16.png';

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

	const getHistory = () => {
		const historyArr = task.historyJSON && JSON.parse(task.historyJSON) ? JSON.parse(task.historyJSON) : [];
		let type;

		if (Array.isArray(historyArr[0])) {
			const len = historyArr.length - 1;
			const last = historyArr[len];

			if (last.length) {
				const lastlen = last.length - 1;
				const lastItem = last[lastlen];

				if (lastItem.type === 'call') {
					type = 'Созвонился';
				} else if (lastItem?.type === 'start') {
					type = 'В работе';
				} else if (lastItem?.type === 'comment') {
					type = `Примечание от ${lastItem?.user.split(' ')[0]}`;
				} else if (lastItem?.type === 'finish') {
					type = 'Завершил работу';
				} else if (lastItem?.type === 'changeTech') {
					type = `Смена исполнителя`;
				} else if (lastItem?.type === 'view') {
					type = `Прочитана`;
				}

				return type;
			} else {
				return 'Брак';
			}
		} else {
			const lastItem = historyArr[historyArr.length - 1];
			if (lastItem?.type === 'call') {
				type = 'Созвонился';
			} else if (lastItem?.type === 'start') {
				type = 'В работе';
			} else if (lastItem?.type === 'comment') {
				type = `Примечание от ${lastItem?.user.split(' ')[0]}`;
			} else if (lastItem?.type === 'finish') {
				type = 'Завершил работу';
			} else if (lastItem?.type === 'changeTech') {
				type = `Смена исполнителя`;
			} else if (lastItem?.type === 'view') {
				type = `Прочитана`;
			}

			return type;
		}
	};

	return (
		<div className={`${styles.wrapper} `} onClick={() => navigate(`/tasks/${task.id}`)}>
			<div className={`${styles.indication_mark} ${putStatusMark()}`}></div>
			{task.status === 'Брак' && <div className={styles.brack_shtamp}>Брак</div>}

			<div className={styles.task_data}>
				<p className={styles.status}>{getHistory()}</p>
				<div className={styles.flex_div}>
					<div>
						{task.object_address && (
							<p>
								<span>Адресс:</span> {task.object_address}
							</p>
						)}
						{task.object_name && (
							<p>
								<span>Название:</span> {task.object_name}
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

				{task.files !== '' && (
					<div className={styles.has_files}>
						<img src={ImgExclMark} alt="exclamation-mark" />
						<p>Есть прикрепленные файлы</p>
					</div>
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

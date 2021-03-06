import { useEffect, useState } from 'react';

import styles from './Report.module.scss';
import moment from 'moment';
import { $linkServer } from '../../../../$config';
import chevron from '../../../../img/chevronDown32.png';
import ImageFile from '../../Files/ImageFile/ImageFile';

const Report = ({ task, filesArr, date }) => {
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);
	const [otherFiles, setOtherFiles] = useState([]);
	const [showFiles, setShowFiles] = useState(false);

	const fileExt = (file) => {
		return file.split('.').at(-1);
	};

	useEffect(() => {
		if (filesArr) {
			setImageFiles([]);
			setVideoFiles([]);
			setOtherFiles([]);
			filesArr.forEach((file) => {
				if (fileExt(file) === 'png' || fileExt(file) === 'jpeg' || fileExt(file) === 'jpg') {
					setImageFiles((prev) => [...prev, file]);
				} else if (fileExt(file) === 'mp4') {
					setVideoFiles((prev) => [...prev, file]);
				} else {
					setOtherFiles((prev) => [...prev, file]);
				}
			});
		}
	}, [filesArr]);

	return (
		<div className={`${styles.wrapper} ${styles.report}`}>
			<p className={styles.title}>Oтчёт по выполненной задаче</p>
			<p className={styles.task_name}>Задача: {task.title}</p>
			<p className={styles.status}>Статус: {task.status}</p>
			<p className={styles.status}>Отчет:</p>
			{task.report_comment && <p className={styles.comment}>{task.report_comment}</p>}
			<p className={styles.date}>{moment(date).format('DD.MM.YYYY')}</p>
			{filesArr && (
				<div className={styles.show_files_btn} onClick={() => setShowFiles((prev) => !prev)}>
					<img className={showFiles ? styles.open : null} src={chevron} alt="" />
					<p>{showFiles ? 'Скрыть' : 'Показать'} прикрепленные файлы</p>
				</div>
			)}
			{showFiles && (
				<>
					<div className={styles.images_wrapper}>
						{imageFiles &&
							imageFiles.map((file) => <ImageFile src={`${$linkServer}/raportFiles/${task.id}/${file}`} />)}
					</div>

					<div className={styles.videos_wrapper}>
						{videoFiles &&
							videoFiles.map((file) => (
								<video key={file} controls muted className={styles.video}>
									<source src={`${$linkServer}/raportFiles/${task}/${file}`} type="video/mp4" />
								</video>
							))}
					</div>

					<div className={styles.others_wrapper}>
						{otherFiles &&
							otherFiles.map((file) => (
								<a
									key={file}
									target="_blank"
									rel="noreferrer"
									download={`${$linkServer}/raportFiles/${task}/${file}`}
									href={file}>
									{file}
								</a>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Report;

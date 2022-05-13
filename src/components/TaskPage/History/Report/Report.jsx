import { useEffect, useState } from 'react';

import styles from './Report.module.scss';
import moment from 'moment';
import { $linkServer } from '../../../../$config';
import chevron from '../../../../img/chevron-down.png';

const Report = ({ id, title, status, comment, date, filesArr }) => {
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
	}, []);

	// console.log('render');

	return (
		<div className={`${styles.wrapper} ${styles.report}`}>
			<p className={styles.title}>Oтчёт по выполненной задаче</p>
			<p className={styles.task_name}>Задача: {title}</p>
			<p className={styles.status}>Статус: {status}</p>
			<p className={styles.status}>Отчет:</p>
			{comment && <p className={styles.comment}>{comment}</p>}
			<p className={styles.date}>{moment(date).format('DD.MM.YYYY')}</p>
			{filesArr && (
				<div className={styles.show_files_btn} onClick={() => setShowFiles((prev) => !prev)}>
					<img className={showFiles && styles.open} src={chevron} alt="" />
					<p>{showFiles ? 'Скрыть' : 'Показать'} прикрепленные файлы</p>
				</div>
			)}
			{showFiles && (
				<>
					<div className={styles.images_wrapper}>
						{imageFiles &&
							imageFiles.map((file) => (
								<img key={file} src={`${$linkServer}/raportFiles/${id}/${file}`} alt={file} />
							))}
					</div>

					<div className={styles.videos_wrapper}>
						{videoFiles &&
							videoFiles.map((file) => (
								<video key={file} controls muted className={styles.video}>
									<source src={`${$linkServer}/raportFiles/${id}/${file}`} type="video/mp4" />
								</video>
							))}
					</div>

					<div className={styles.others_wrapper}>
						{otherFiles &&
							otherFiles.map((file) => (
								<a key={file} target="_blank" download={`${$linkServer}/raportFiles/${id}/${file}`} href={file}>
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

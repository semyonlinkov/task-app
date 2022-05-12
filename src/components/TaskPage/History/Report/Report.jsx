import { useEffect, useState } from 'react';

import styles from './Report.module.scss';
import moment from 'moment';
import { $linkServer } from '../../../../$config';

const Report = ({ id, title, status, comment, date, filesArr }) => {
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);
	const [otherFiles, setOtherFiles] = useState([]);

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

	console.log(imageFiles, videoFiles, otherFiles);

	return (
		<div className={`${styles.wrapper} ${styles.report}`}>
			<p className={styles.status}>Статус: {status}</p>
			<p className={styles.task_name}>Задача: {title}</p>
			{comment && <p className={styles.comment}>{comment}</p>}

			{imageFiles &&
				imageFiles.map((file) => <img src={`https://volga24bot.com/tasks/raportFiles/${id}/${file}`} alt={file} />)}
			{videoFiles &&
				videoFiles.map((file) => (
					<video controls muted className={styles.video}>
						<source src={`https://volga24bot.com/tasks/raportFiles/${id}/${file}`} type="video/mp4" />
					</video>
				))}
			{otherFiles &&
				otherFiles.map((file) => (
					<>
						<a target="_blank" download={`https://volga24bot.com/tasks/raportFiles/${id}/${file}`} href={file}>
							{file}
						</a>
					</>
				))}

			<p className={styles.date}>{moment(date).format('DD.MM.YYYY')}</p>
		</div>
	);
};

export default Report;

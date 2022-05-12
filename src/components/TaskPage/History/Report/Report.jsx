import styles from './Report.module.scss';
import moment from 'moment';
import ImageFile from '../../Files/ImageFile/ImageFile';
import VideoFile from '../../Files/VideoFile/VideoFile';
import OtherFile from '../../Files/OtherFile/OtherFile';
import { useState } from 'react';

const Report = ({ title, status, comment, date }) => {
	// const [filesArr, setFilesArr] = useState([]);
	// const [imageFiles, setImageFiles] = useState([]);
	// const [videoFiles, setVideoFiles] = useState([]);
	// const [otherFiles, setOtherFiles] = useState([]);

	// useEffect(() => {
	// 	if (task.files !== '' || task.files !== undefined) {
	// 		const taskArr = { ...task }.files.split(';');
	// 		if (taskArr.at(-1) === '') {
	// 			taskArr.splice(taskArr.length - 1, 1);
	// 		}
	// 		setFilesArr(taskArr);
	// 	}
	// }, [task]);

	return (
		<div className={`${styles.wrapper} ${styles.report}`}>
			<p className={styles.status}>Статус: {status}</p>
			<p className={styles.task_name}>Задача: {title}</p>
			<p className={styles.comment}>{comment}</p>

			{/* {imageFiles &&
				imageFiles.map((file, i) => (
					<FilesDropdown key={file + i} alt={file} fileName={file} typeFile="Фото">
						<ImageFile src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} fileName={file} />
					</FilesDropdown>
				))}
			{videoFiles &&
				videoFiles.map((file, i) => (
					<FilesDropdown key={file + i} alt={file} fileName={file} typeFile="Видео">
						<VideoFile src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} fileName={file} />
					</FilesDropdown>
				))}
			{otherFiles &&
				otherFiles.map((file, i) => (
					<OtherFile
						key={file + i}
						src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`}
						fileName={file}
					/>
				))} */}

			<p className={styles.date}>{moment(date).format('DD.MM.YYYY')}</p>
		</div>
	);
};

export default Report;

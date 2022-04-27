import { useStore } from 'effector-react';
import React, { useEffect, useMemo, useState } from 'react';
import FilesDropdown from './FilesDropdown/FilesDropdown';

import styles from './Files.module.scss';
import { $singleTask } from '../../../store/selectedTask';
import OtherFile from './OtherFile/OtherFile';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';

const Files = () => {
	const task = useStore($singleTask);
	const [filesArr, setFilesArr] = useState([]);
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);
	const [otherFiles, setOtherFiles] = useState([]);

	useEffect(() => {
		if (task.files !== '') {
			setFilesArr(task.files.split(';'));
		}
	}, [task]);

	const fileExt = (file) => {
		return file.split('.').at(-1);
	};

	const filesFilter = useMemo(() => {
		filesArr.forEach((file, i) => {
			if (fileExt(file) === 'png' || fileExt(file) === 'jpeg') {
				setImageFiles((prev) => [...prev, file]);
			} else if (fileExt(file) === 'mp4') {
				setVideoFiles((prev) => [...prev, file]);
			} else {
				setOtherFiles((prev) => [...prev, file]);
			}
		});
	}, [filesArr]);

	return (
		<div className={styles.wrapper}>
			{imageFiles &&
				imageFiles.map((file) => (
					<FilesDropdown key={file} alt={file} fileName={file} typeFile="Фото">
						<ImageFile src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} fileName={file} />
					</FilesDropdown>
				))}
			{videoFiles &&
				videoFiles.map((file) => (
					<FilesDropdown key={file} alt={file} fileName={file} typeFile="Видео">
						<VideoFile src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} fileName={file} />
					</FilesDropdown>
				))}
			{otherFiles &&
				otherFiles.map((file) => (
					<OtherFile
						key={file}
						src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`}
						fileName={file}
					/>
				))}
			<div className={styles.file_input}>
				<input type="file" id="file" className={styles.file} />
				<label htmlFor="file">Выбрать файл</label>
			</div>
		</div>
	);
};

export default Files;

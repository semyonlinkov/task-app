import { useStore } from 'effector-react';
import React, { useEffect, useMemo, useState } from 'react';
import FilesDropdown from './FilesDropdown/FilesDropdown';

import styles from './Files.module.scss';
import { $singleTask, setSingleTask } from '../../../store/selectedTask';
import OtherFile from './OtherFile/OtherFile';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';
import { sendFiles } from '../../../services-api/sendFiles';

const Files = () => {
	const task = useStore($singleTask);
	const [filesArr, setFilesArr] = useState([]);
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);
	const [otherFiles, setOtherFiles] = useState([]);

	useEffect(() => {
		if (task.files !== '' || task.files !== undefined) {
			const taskArr = { ...task }.files.split(';');
			if (taskArr.at(-1) === '') {
				taskArr.splice(taskArr.length - 1, 1);
			}
			setFilesArr(taskArr);
		}
	}, [task]);

	const fileExt = (file) => {
		return file.split('.').at(-1);
	};

	const filesFilter = useMemo(() => {
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
	}, [filesArr]);

	return (
		<div className={styles.wrapper}>
			{imageFiles &&
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
				))}
			<div className={styles.file_input}>
				<input
					onChange={(e) => {
						console.log('onClick');
						let fileNameAlredyHasCheck = false;

						Array.from(e.target.files).forEach((file) => {
							if (task.files.includes(file.name)) fileNameAlredyHasCheck = true;
						});

						if (fileNameAlredyHasCheck) {
							alert('Ошибка! Такой файл уже существует. Переименуйте файл');
						} else {
							sendFiles(e.target.files, task.id, setSingleTask);
						}
					}}
					type="file"
					id="file"
					className={styles.file}
					multiple
				/>
				<label htmlFor="file">Выбрать файл</label>
			</div>
		</div>
	);
};

export default Files;

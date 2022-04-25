import { useStore } from 'effector-react';
import React, { useEffect, useMemo, useState } from 'react';
import FilesDropdown from './FilesDropdown/FilesDropdown';

import styles from './Files.module.scss';
import { $singleTask } from '../../../store/selectedTask';
import OtherFile from './FilesDropdown/OtherFile/OtherFile';

const Files = () => {
	const task = useStore($singleTask);
	const [filesArr, setFilesArr] = useState([]);
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);
	const [otherFiles, setOtherFiles] = useState([]);

	useEffect(() => {
		const { files } = task;
		setFilesArr(files.split(';'));
	}, []);

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
			{imageFiles.map((file) => (
				<FilesDropdown
					key={file}
					src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`}
					alt={file}
					fileName={file}
					typeFile="Фото"
				/>
			))}
			{videoFiles.map((file) => (
				<FilesDropdown
					key={file}
					src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`}
					alt={file}
					fileName={file}
					typeFile="Видео"
				/>
			))}
			{otherFiles.map((file) => (
				<OtherFile src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} fileName={file} />
			))}
			<div className={styles.file_input}>
				<input type="file" id="file" className={styles.file} />
				<label htmlFor="file">Выбрать файл</label>
			</div>
		</div>
	);
};

export default Files;

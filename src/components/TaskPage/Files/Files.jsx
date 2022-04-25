import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';

import ImageDropdown from './ImageDropdown/ImageDropdown';

import styles from './Files.module.scss';
import { $singleTask } from '../../../store/selectedTask';

const Files = () => {
	const task = useStore($singleTask);
	const [files, setFiles] = useState([]);

	useEffect(() => {
		const newTask = { ...task };
		setFiles(newTask.files.split(';'));
	}, []);

	// console.log(task);

	return (
		<div className={styles.wrapper}>
			{files.map((file) => (
				<ImageDropdown key={file} src={`https://volga24bot.com/tasks/taskFiles/${task.id}/${file}`} alt={file} />
			))}
			<div className={styles.file_input}>
				<input type="file" id="file" className={styles.file} />
				<label htmlFor="file">Выбрать файл</label>
			</div>
		</div>
	);
};

export default Files;

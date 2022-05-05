import { useStore } from 'effector-react';
import React from 'react';
import trash from '../../../../img/trash.png';
import { removeFile } from '../../../../services-api/removeFile';
import { $singleTask } from '../../../../store/selectedTask';
import styles from './OtherFile.module.scss';

const OtherFile = ({ src, fileName }) => {
	const task = useStore($singleTask);

	return (
		<div className={styles.wrapper}>
			<a target="_blank" download={src} href={src}>
				{fileName}
			</a>
			<input type="image" src={trash} onClick={() => removeFile(task.files, task.id, fileName)} />
		</div>
	);
};

export default OtherFile;

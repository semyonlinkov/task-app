import { useStore } from 'effector-react';
import React from 'react';
import { $showSingleTask } from '../../../store/tasks';

import { catPhotos } from '../../../fakeData/data';
import ImageDropdown from './ImageDropdown/ImageDropdown';

import styles from './Files.module.scss';

const Files = () => {
	const task = useStore($showSingleTask);

	return (
		<div className={styles.wrapper}>
			{catPhotos.map((src, i) => (
				<ImageDropdown key={src} src={src} alt={`file-${i + 1}`} />
			))}
			<div className={styles.file_input}>
				<input type="file" id="file" className={styles.file} />
				<label htmlFor="file">Select file</label>
			</div>
		</div>
	);
};

export default Files;

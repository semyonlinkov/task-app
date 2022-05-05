import { useState } from 'react';
import styles from './FilesDropdown.module.scss';
import eye from '../../../../img/eye.png';
import trash from '../../../../img/trash.png';
import { $singleTask } from '../../../../store/selectedTask';
import { useStore } from 'effector-react';
import { removeFile } from '../../../../services-api/removeFile';

const ImageDropdown = ({ typeFile, children, fileName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const task = useStore($singleTask);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown}>
				<p className={styles.title}>{typeFile}</p>
				<div className={styles.btns}>
					<input type="image" src={eye} onClick={openToggle} />
					<input type="image" src={trash} onClick={() => removeFile(task.files, task.id, fileName)} />
				</div>
			</div>
			{typeFile === 'Фото' && isOpen && children}
			{typeFile === 'Видео' && isOpen && children}
		</div>
	);
};

export default ImageDropdown;

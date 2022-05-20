import { useState } from 'react';
import styles from './FilesDropdown.module.scss';
import ImgOpen from '../../../../img/openEye32.png';
import ImgDelete from '../../../../img/deleteBin32.png';
import { $singleTask } from '../../../../store/selectedTask';
import { useStore } from 'effector-react';
import { removeFile } from '../../../../services-api/removeFile';
import { $user } from '../../../../store/user';

const ImageDropdown = ({ typeFile, children, fileName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const task = useStore($singleTask);
	const user = useStore($user);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	// console.log(task);
	// console.log(user);

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown}>
				<p className={styles.title}>{typeFile}</p>
				<div className={styles.btns}>
					{task.creatorID === user.ID && (
						<input
							className={styles.delete}
							type="image"
							src={ImgDelete}
							onClick={() => removeFile(task.files, task.id, fileName)}
						/>
					)}
					<input className={styles.show} type="image" src={ImgOpen} onClick={openToggle} />
				</div>
			</div>
			{typeFile === 'Фото' && isOpen && children}
			{typeFile === 'Видео' && isOpen && children}
		</div>
	);
};

export default ImageDropdown;

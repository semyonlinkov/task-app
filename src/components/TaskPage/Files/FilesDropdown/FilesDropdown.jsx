import { useState } from 'react';
import styles from './FilesDropdown.module.scss';
import eye from '../../../../img/eye.png';
import trash from '../../../../img/trash.png';

const ImageDropdown = ({ typeFile, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown}>
				<p className={styles.title}>{typeFile}</p>
				<div className={styles.btns}>
					<input type="image" src={eye} onClick={openToggle} />
					<input type="image" src={trash} />
				</div>
			</div>
			{typeFile === 'Фото' && isOpen && children}
			{typeFile === 'Видео' && isOpen && children}
		</div>
	);
};

export default ImageDropdown;

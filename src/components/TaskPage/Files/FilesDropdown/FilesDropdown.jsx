import { useState } from 'react';
import styles from './FilesDropdown.module.scss';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';
import eye from '../../../../img/eye.png';
import trash from '../../../../img/trash.png';

const ImageDropdown = ({ src, fileName, typeFile }) => {
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
			{typeFile === 'Фото' && isOpen && <ImageFile src={src} fileName={fileName} />}
			{typeFile === 'Видео' && isOpen && <VideoFile src={src} fileName={fileName} />}
		</div>
	);
};

export default ImageDropdown;

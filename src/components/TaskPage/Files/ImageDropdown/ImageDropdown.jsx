import { useEffect, useMemo, useState } from 'react';
import styles from './ImageDropdown.module.scss';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';
import OtherFile from './OtherFile/OtherFile';
import chevron from '../../../../img/chevron-down.png';
import eye from '../../../../img/eye.png';
import trash from '../../../../img/trash.png';

const ImageDropdown = ({ src }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fileExt, setFileExt] = useState('');
	const [fileType, setFileType] = useState('');

	useEffect(() => {
		setFileExt(src.split('.').at(-1));
	}, []);

	const fileComponentHandler = useMemo(() => {
		if (fileExt === 'png' || fileExt === 'jpeg') {
			setFileType('Фото');
			return <ImageFile src={src} />;
		} else if (fileExt === 'mp4') {
			setFileType('Видео');
			return <VideoFile src={src} />;
		} else if (fileExt !== 'png' && fileExt !== 'jpeg' && fileExt !== 'mp4') {
			setFileType(src.split('/').at(-1));
			// return <OtherFile src={src} />;
		}
	}, [fileExt]);

	console.log(src);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown}>
				<p className={styles.title}>
					{fileType !== 'Фото' || fileType !== 'Видео' ? (
						<a target="_blank" download={src} href={src}>
							{fileType}
						</a>
					) : (
						fileType
					)}
				</p>
				<div className={styles.btns}>
					<input type="image" src={eye} onClick={openToggle} />
					<input type="image" src={trash} />
				</div>
			</div>

			{isOpen && fileComponentHandler}
		</div>
	);
};

export default ImageDropdown;

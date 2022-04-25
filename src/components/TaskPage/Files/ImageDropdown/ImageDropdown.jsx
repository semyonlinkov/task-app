import { useEffect, useMemo, useState } from 'react';
import styles from './ImageDropdown.module.scss';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';
import OtherFile from './OtherFile/OtherFile';
import chevron from '../../../../img/chevron-down.png';

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
			return <OtherFile src={src} />;
		}
	}, [fileExt]);

	console.log(src);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown} onClick={openToggle}>
				<input className={`${styles.chevron} ${isOpen ? styles.open : null}`} type="image" src={chevron} />
				<p className={styles.title}>{fileType}</p>
			</div>
			{isOpen && fileComponentHandler}
		</div>
	);
};

export default ImageDropdown;

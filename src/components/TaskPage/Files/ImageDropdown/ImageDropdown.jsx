import { useEffect, useState } from 'react';
import styles from './ImageDropdown.module.scss';
import ImageFile from './ImageFile/ImageFile';
import VideoFile from './VideoFile/VideoFile';
import OtherFile from './OtherFile/OtherFile';

const ImageDropdown = ({ src }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fileExt, setFileExt] = useState('');

	useEffect(() => {
		setFileExt(src.split('.').at(-1));
	}, []);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown} onClick={openToggle}>
				Open/Close
			</div>
			{isOpen && (fileExt === 'png' || fileExt === 'jpeg') ? <ImageFile src={src} /> : null}
			{isOpen && fileExt === 'mp4' ? <VideoFile src={src} /> : null}
			{isOpen && fileExt !== 'png' && fileExt !== 'jpeg' && fileExt !== 'mp4' ? <OtherFile src={src} /> : null}
		</div>
	);
};

export default ImageDropdown;
